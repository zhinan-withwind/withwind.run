        // Region data and selection functionality
        let regionData = [];
        let selectedProvince = null;
        let selectedCity = null;
        let selectedDistrict = null;
        
        // Load region data from JSON file
        async function loadRegionData() {
            try {
                const response = await fetch('./region.json');
                if (!response.ok) {
                    throw new Error('Failed to load region data');
                }
                regionData = await response.json();
                console.log('✅ Region data loaded:', regionData.length, 'regions');
                initializeProvinceSelector();
            } catch (error) {
                console.error('❌ Failed to load region data:', error);
            }
        }
        
        // Initialize province selector
        function initializeProvinceSelector() {
            const provinces = regionData.filter(region => region.parentId === 0);
            const provinceSelect = document.getElementById('province-select');
            
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.code;
                option.textContent = province.name;
                option.dataset.id = province.id;
                provinceSelect.appendChild(option);
            });
            
            // Add change event listener
            provinceSelect.addEventListener('change', handleProvinceChange);
        }
        
        // Handle province selection
        function handleProvinceChange() {
            const provinceSelect = document.getElementById('province-select');
            const citySelect = document.getElementById('city-select');
            const districtSelect = document.getElementById('district-select');
            
            // Reset city and district selections
            citySelect.innerHTML = '<option value="">请选择城市</option>';
            districtSelect.innerHTML = '<option value="">请选择区县</option>';
            citySelect.disabled = true;
            districtSelect.disabled = true;
            
            selectedProvince = null;
            selectedCity = null;
            selectedDistrict = null;
            
            const selectedProvinceCode = provinceSelect.value;
            if (!selectedProvinceCode) {
                updateRegionDisplay();
                return;
            }
            
            // Find selected province
            selectedProvince = regionData.find(region => region.code === selectedProvinceCode);
            
            // Load cities for this province
            const cities = regionData.filter(region => 
                region.parentId === selectedProvince.id
            );
            
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.code;
                option.textContent = city.name;
                option.dataset.id = city.id;
                citySelect.appendChild(option);
            });
            
            citySelect.disabled = false;
            citySelect.addEventListener('change', handleCityChange);
            updateRegionDisplay();
        }
        
        // Handle city selection
        function handleCityChange() {
            const citySelect = document.getElementById('city-select');
            const districtSelect = document.getElementById('district-select');
            
            // Reset district selection
            districtSelect.innerHTML = '<option value="">请选择区县</option>';
            districtSelect.disabled = true;
            
            selectedCity = null;
            selectedDistrict = null;
            
            const selectedCityCode = citySelect.value;
            if (!selectedCityCode) {
                updateRegionDisplay();
                return;
            }
            
            // Find selected city
            selectedCity = regionData.find(region => region.code === selectedCityCode);
            
            // Load districts for this city
            const districts = regionData.filter(region => 
                region.parentId === selectedCity.id
            );
            
            if (districts.length > 0) {
                districts.forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.code;
                    option.textContent = district.name;
                    option.dataset.id = district.id;
                    districtSelect.appendChild(option);
                });
                districtSelect.disabled = false;
                districtSelect.addEventListener('change', handleDistrictChange);
            }
            
            updateRegionDisplay();
        }
        
        // Handle district selection
        function handleDistrictChange() {
            const districtSelect = document.getElementById('district-select');
            const selectedDistrictCode = districtSelect.value;
            
            if (!selectedDistrictCode) {
                selectedDistrict = null;
            } else {
                selectedDistrict = regionData.find(region => region.code === selectedDistrictCode);
            }
            
            updateRegionDisplay();
        }
        
        // Update region display and hidden inputs
        function updateRegionDisplay() {
            const regionDisplay = document.getElementById('region-display');
            const selectedRegionDiv = document.getElementById('selected-region');
            const regionInput = document.getElementById('region');
            const regionCodeInput = document.getElementById('region-code');
            
            let regionNames = [];
            let regionCode = '';
            
            if (selectedProvince) {
                regionNames.push(selectedProvince.name);
                regionCode = selectedProvince.code;
            }
            
            if (selectedCity) {
                regionNames.push(selectedCity.name);
                regionCode = selectedCity.code;
            }
            
            if (selectedDistrict) {
                regionNames.push(selectedDistrict.name);
                regionCode = selectedDistrict.code;
            }
            
            if (regionNames.length > 0) {
                regionDisplay.textContent = regionNames.join('-');
                selectedRegionDiv.classList.remove('hidden');
                regionInput.value = regionNames.join('-');
                regionCodeInput.value = regionCode;
                console.log('📍 Region selected:', regionNames.join('-'), 'Code:', regionCode);
            } else {
                selectedRegionDiv.classList.add('hidden');
                regionInput.value = '';
                regionCodeInput.value = '';
            }
        }
        
        // Form submission handler
        document.getElementById('divineForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                birthday: document.getElementById('birthday').value,
                sex: document.getElementById('sex').value,
                region: document.getElementById('region').value,
                regionCode: document.getElementById('region-code').value,
            };
            
            // Validate required fields are filled
            if (!formData.name || !formData.birthday || !formData.sex) {
                alert('请填写所有必填字段（姓名、生日、性别）');
                return;
            }
            
            // Show loading
            document.getElementById('loadingSection').classList.remove('hidden');
            document.getElementById('resultsSection').classList.add('hidden');
            
            try {
                // Convert birthday to proper format for API
                const birthdayDate = new Date(formData.birthday);
                
                // Format for Chart API: YYYY-MM-DDTHH:mm
                const chartTimeFormat = birthdayDate.toISOString().slice(0, 16);
                
                // Format for Analysis API: YYYY-MM-DD HH:mm
                const year = birthdayDate.getFullYear();
                const month = String(birthdayDate.getMonth() + 1).padStart(2, '0');
                const day = String(birthdayDate.getDate()).padStart(2, '0');
                const hour = String(birthdayDate.getHours()).padStart(2, '0');
                const minute = String(birthdayDate.getMinutes()).padStart(2, '0');
                const analysisTimeFormat = `${year}-${month}-${day} ${hour}:${minute}`;
                
                // Debug: Log form data
                console.log('📤 Form Data:', formData);
                console.log('🕐 Chart Time Format:', chartTimeFormat);
                console.log('🕐 Analysis Time Format:', analysisTimeFormat);
                
                // Determine API URLs based on environment
                const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                console.log('🌐 Environment:', isLocalDev ? 'Local Development' : 'Production');
                
                let chartUrl, analysisUrl;
                
                if (isLocalDev) {
                    // Use local proxy in development
                    chartUrl = `/api/zhouyi/qimen/divine/chart?divineTime=${encodeURIComponent(analysisTimeFormat)}&region=${encodeURIComponent(formData.regionCode)}`;
                    analysisUrl = `/api/zhouyi/qimen/analyzeForJiang?name=${encodeURIComponent(formData.name)}&birthday=${encodeURIComponent(analysisTimeFormat)}&region=${encodeURIComponent(formData.regionCode)}&sex=${encodeURIComponent(formData.sex)}`;
                } else {
                    // Use direct API in production
                    chartUrl = `https://app.withwind.run/zhouyi/qimen/divine/chart?divineTime=${encodeURIComponent(analysisTimeFormat)}&region=${encodeURIComponent(formData.regionCode)}`;
                    analysisUrl = `https://app.withwind.run/zhouyi/qimen/analyzeForJiang?name=${encodeURIComponent(formData.name)}&birthday=${encodeURIComponent(analysisTimeFormat)}&region=${encodeURIComponent(formData.regionCode)}&sex=${encodeURIComponent(formData.sex)}`;
                }
                
                console.log('🔗 Chart URL:', chartUrl);
                console.log('🔗 Analysis URL:', analysisUrl);
                
                // Make API calls in parallel
                const [chartResponse, analysisResponse] = await Promise.all([
                    fetch(chartUrl),
                    fetch(analysisUrl)
                ]);
                
                console.log('📊 Chart Response Status:', chartResponse.status, chartResponse.statusText);
                console.log('📊 Analysis Response Status:', analysisResponse.status, analysisResponse.statusText);
                
                // Handle chart image
                if (chartResponse.ok) {
                    console.log('✅ Chart API successful');
                    const chartBlob = await chartResponse.blob();
                    console.log('🖼️ Chart blob size:', chartBlob.size, 'bytes');
                    
                    if (chartBlob.size > 0) {
                        const chartImageUrl = URL.createObjectURL(chartBlob);
                        document.getElementById('chartImage').src = chartImageUrl;
                        document.getElementById('chartSection').classList.remove('hidden');
                    } else {
                        console.warn('⚠️ Chart image is empty');
                    }
                } else {
                    console.error('❌ Chart API failed:', chartResponse.status, chartResponse.statusText);
                    const errorText = await chartResponse.text();
                    console.error('Chart Error Response:', errorText);
                }
                
                // Handle analysis data
                if (analysisResponse.ok) {
                    console.log('✅ Analysis API successful');
                    const analysisData = await analysisResponse.json();
                    console.log('📋 Analysis Data:', analysisData);
                    
                    displayAnalysisData(analysisData);
                    document.getElementById('analysisSection').classList.remove('hidden');
                } else {
                    console.error('❌ Analysis API failed:', analysisResponse.status, analysisResponse.statusText);
                    const errorText = await analysisResponse.text();
                    console.error('Analysis Error Response:', errorText);
                }
                
                // Show results and hide loading
                document.getElementById('loadingSection').classList.add('hidden');
                document.getElementById('resultsSection').classList.remove('hidden');
                
            } catch (error) {
                console.error('💥 API request failed:', error);
                document.getElementById('loadingSection').classList.add('hidden');
                alert('排盘请求失败：' + error.message);
            }
        });
        
        function displayAnalysisData(data) {
            console.log('🎨 开始解析数据:', data);
            
            // Hide all templates first
            document.getElementById('basicInfoTemplate').classList.add('hidden');
            document.getElementById('palaceInfoTemplate').classList.add('hidden');
            document.getElementById('noDataMessage').classList.add('hidden');
            
            // 如果数据为空或无效，显示提示信息
            if (!data || (typeof data !== 'object')) {
                console.warn('⚠️ 数据为空或格式错误:', data);
                document.getElementById('noDataMessage').classList.remove('hidden');
                return;
            }
            
            // 处理基本信息
            if (data.baseInfo) {
                const base = data.baseInfo;
                
                // 填充基本信息
                document.getElementById('personName').textContent = base.personName || '';
                document.getElementById('title').textContent = base.sex || '';
                
                // 填充日期时间信息
                const datetimeInfo = document.getElementById('datetimeInfo');
                let datetimeHtml = '';
                if (base.solarBirthday) {
                    datetimeHtml += `<p>公历 ${base.solarBirthday}`;
                    if (base.lunarBirthday) {
                        datetimeHtml += `<br>农历 ${base.lunarBirthday}`;
                    }
                    if (base.apparentSolarTime) {
                        datetimeHtml += `<br>真太阳时 ${base.apparentSolarTime}`;
                    }
                    datetimeHtml += '</p>';
                }
                datetimeInfo.innerHTML = datetimeHtml;
                
                // 填充干支信息
                const ganZhiInfo = document.getElementById('ganZhiInfo');
                let ganZhiHtml = '';
                if (base.ganZhiBirthday) {
                    ganZhiHtml += '<p>四柱：';
                    ganZhiHtml += `年柱/${base.ganZhiBirthday.ganZhiYear?.name || ''} `;
                    ganZhiHtml += `月柱/${base.ganZhiBirthday.ganZhiMonth?.name || ''} `;
                    ganZhiHtml += `日柱/${base.ganZhiBirthday.ganZhiDay?.name || ''} `;
                    ganZhiHtml += `时柱/${base.ganZhiBirthday.ganZhiTime?.name || ''}`;
                    ganZhiHtml += '</p>';
                }
                ganZhiInfo.innerHTML = ganZhiHtml;
                
                // 填充其他信息
                document.getElementById('pattern').textContent = base.pattern || '';
                document.getElementById('xunHead').textContent = base.xunHead || '';
                document.getElementById('dutyStar').textContent = base.dutyStar || '';
                document.getElementById('dutyDoor').textContent = base.dutyDoor || '';
                
                // 处理节气
                document.getElementById('lastSolarTerm').textContent = 
                    base.lastSolarTerm ? `${base.lastSolarTerm.name || ''} ${base.lastSolarTerm.dateTime || ''}` : '';
                document.getElementById('nextSolarTerm').textContent = 
                    base.nextSolarTerm ? `${base.nextSolarTerm.name || ''} ${base.nextSolarTerm.dateTime || ''}` : '';
                
                // 显示基本信息模板
                document.getElementById('basicInfoTemplate').classList.remove('hidden');
            }
            
            // 处理八宫信息
            if (data.palaceInfo) {
                const palaceList = document.getElementById('palaceList');
                let palaceHtml = '';
                
                const orderSeq = ["巽四宫", "离九宫", "坤二宫", "兑七宫", "乾六宫", "坎一宫", "艮八宫", "震三宫"];
                
                orderSeq.forEach(palaceName => {
                    const palace = data.palaceInfo[palaceName];
                    if (palace) {
                        const doorName = palace.door?.fullName || palace.door?.name || '';
                        const starName = palace.star?.name || palace.star?.shortName || '';
                        const deityName = palace.deity?.name || palace.deity?.shortName || '';
                        const tGan = palace.heaven?.gan?.name || '';
                        const tStat = palace.heaven?.statuses || '';
                        const dGan = palace.ground?.gan?.name || '';
                        const dStat = palace.ground?.statuses || '';
                        
                        const isKongWang = (palace.isTimeEmpty);
                        const isMaXing = palace.isHorse || false;
                        const isRuMu = (palace.ground?.isEnterTomb) || (dStat?.includes('墓'));
                        const isNative = palace.isNative || false;
                        
                        palaceHtml += `<p><strong class="font-light">${palaceName}：</strong>${doorName}/${starName}/${deityName} 天${tGan}`;
                        if (tStat) palaceHtml += `<span class="text-gray-600 font-light">【${tStat}】</span>`;
                        palaceHtml += `/地${dGan}`;
                        if (dStat) palaceHtml += `<span class="text-gray-600 font-light">【${dStat}】</span>`;
                        if (isKongWang) palaceHtml += ' <span class="text-gray-700 font-medium">空亡</span>';
                        if (isMaXing) palaceHtml += ' <span class="text-gray-700 font-medium">马星</span>';
                        if (isRuMu) palaceHtml += ' <span class="text-gray-700 font-medium">入墓</span>';
                        if (isNative) palaceHtml += ' （<span class="text-gray-700 font-medium">本宫</span>）';
                        palaceHtml += '</p>';
                    }
                });
                
                palaceList.innerHTML = palaceHtml;
                document.getElementById('palaceInfoTemplate').classList.remove('hidden');
            }
            
            console.log('✅ 数据解析完成并显示');
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Load region data
            loadRegionData();
            
            // Initialize fade-in animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        });