const { createApp, ref, computed, onMounted } = Vue;

createApp({
    setup() {
        // === 数据状态 ===
        const state = ref('start'); // start, quiz, result
        const banks = ref([]); // 题库列表
        const currentBankId = ref(null);
        
        const allQuestions = ref([]); // 当前题库所有题目
        const quizQueue = ref([]);    // 当前这轮的10道题
        const currentIndex = ref(0);
        
        // 答题交互状态
        const selectedOption = ref(null);
        const hasAnswered = ref(false);
        const isCorrect = ref(false);
        const isShaking = ref(false); // 控制震动
        const flashType = ref(null);  // 控制全屏闪烁 'success' | 'error'
        
        // 成绩与记录
        const score = ref(0);
        const mistakes = ref([]);
        const history = ref({}); // { bankId: [answered_id_1, answered_id_2] }

        // === 计算属性 ===
        const currentQuestion = computed(() => quizQueue.value[currentIndex.value] || {});
        
        const progressPercentage = computed(() => {
            if (quizQueue.value.length === 0) return 0;
            return ((currentIndex.value + (hasAnswered.value ? 1 : 0)) / quizQueue.value.length) * 100;
        });

        const isFinished = computed(() => currentIndex.value >= quizQueue.value.length - 1);
        const feedbackClass = computed(() => isCorrect.value ? 'success' : 'error');
        
        const totalProgress = computed(() => {
            // 计算所有题库总共做过多少题
            let count = 0;
            for(let k in history.value) count += history.value[k].length;
            return count;
        });

        const evaluationText = computed(() => {
            const s = Math.round((score.value / quizQueue.value.length) * 100);
            if (s === 100) return "炉火纯青，天人合一！";
            if (s >= 80) return "吉人天相，大有可为。";
            if (s >= 60) return "君子终日乾乾，夕惕若厉。";
            return "蒙以养正，请继续温习。";
        });

        const appClasses = computed(() => ({
            // 可扩展用于夜间模式等
        }));

        // === 初始化 ===
        onMounted(() => {
            loadHistory();
            loadBanks();
        });

        const loadHistory = () => {
            const saved = localStorage.getItem('zhouyi_history');
            if (saved) history.value = JSON.parse(saved);
        };

        const saveHistory = (bankId, questionId) => {
            if (!history.value[bankId]) history.value[bankId] = [];
            if (!history.value[bankId].includes(questionId)) {
                history.value[bankId].push(questionId);
                localStorage.setItem('zhouyi_history', JSON.stringify(history.value));
            }
        };

        const clearBankHistory = (bankId) => {
            if(history.value[bankId]) {
                history.value[bankId] = [];
                localStorage.setItem('zhouyi_history', JSON.stringify(history.value));
            }
        }

        const loadBanks = async () => {
            try {
                const res = await fetch('banks.json');
                banks.value = await res.json();
            } catch (e) {
                console.error("无法加载题库列表", e);
                // Fallback data if json missing
                banks.value = [{ id: 'demo', name: '演示题库', desc: '读取失败，使用演示数据', file: 'questions_basic.json' }];
            }
        };

        // === 核心流程 ===
        const selectBank = async (bank) => {
            currentBankId.value = bank.id;
            try {
                const res = await fetch(bank.file);
                const data = await res.json();
                allQuestions.value = data;
                startRound(true); // true = smart filter
            } catch (e) {
                alert("题库文件加载失败: " + bank.file);
            }
        };

        const startRound = (useHistoryFilter = false) => {
            let pool = [...allQuestions.value];
            
            if (useHistoryFilter) {
                const answeredIds = history.value[currentBankId.value] || [];
                // 过滤掉已做过的题
                const freshQuestions = pool.filter(q => !answeredIds.includes(q.id));
                
                if (freshQuestions.length === 0) {
                    // 题目做完了
                    if (confirm("恭喜！本题库所有题目已修完。是否重置进度重新开始？")) {
                        clearBankHistory(currentBankId.value);
                        pool = [...allQuestions.value]; // 重置池子
                    } else {
                        return; // 留在首页
                    }
                } else {
                    pool = freshQuestions;
                }
            }

            // 随机抽取10道，或者剩下的全部
            const count = Math.min(10, pool.length);
            const shuffled = pool.sort(() => 0.5 - Math.random());
            quizQueue.value = shuffled.slice(0, count);

            // 重置变量
            currentIndex.value = 0;
            score.value = 0;
            mistakes.value = [];
            resetQuestionState();
            state.value = 'quiz';
        };

        const resetQuestionState = () => {
            selectedOption.value = null;
            hasAnswered.value = false;
            isCorrect.value = false;
            flashType.value = null;
            isShaking.value = false;
        };

        // === 答题交互 (即时反馈) ===
        const handleOptionClick = (opt) => {
            if (hasAnswered.value) return;

            selectedOption.value = opt;
            hasAnswered.value = true;
            
            const correctOpt = currentQuestion.value.answer;
            const isRight = (opt === correctOpt);
            isCorrect.value = isRight;

            // 记录进度 (不管对错都算做过了，或者你可以只记录做对的)
            // 这里策略是：做过了就算，哪怕错了，下次也不再出（除非是错题重练模式）
            if (currentBankId.value) {
                saveHistory(currentBankId.value, currentQuestion.value.id);
            }

            if (isRight) {
                score.value++;
                triggerFlash('success');
            } else {
                mistakes.value.push({ ...currentQuestion.value, myWrong: opt });
                triggerFlash('error');
                isShaking.value = true;
                setTimeout(() => isShaking.value = false, 500);
            }
        };

        const triggerFlash = (type) => {
            flashType.value = type;
            // 动画CSS处理自动淡出，但我们需要重置变量以便下次触发
            setTimeout(() => flashType.value = null, 500);
        };

        const getOptionClass = (opt) => {
            if (!hasAnswered.value) return '';
            if (opt === currentQuestion.value.answer) return 'correct'; // 显示正确答案
            if (opt === selectedOption.value && !isCorrect.value) return 'wrong'; // 显示用户选错的
            return 'disabled'; // 其他选项
        };

        const nextQuestion = () => {
            if (isFinished.value) {
                state.value = 'result';
            } else {
                currentIndex.value++;
                resetQuestionState();
            }
        };

        const retryMistakes = () => {
            quizQueue.value = [...mistakes.value];
            mistakes.value = [];
            currentIndex.value = 0;
            score.value = 0;
            resetQuestionState();
            state.value = 'quiz';
        };

        const resetToHome = () => {
            state.value = 'start';
            loadHistory(); // 刷新首页进度显示
        };

        return {
            state, banks, currentQuestion, quizQueue,
            selectedOption, hasAnswered, isCorrect,
            progressPercentage, feedbackClass, isFinished,
            score, mistakes, evaluationText, totalProgress,
            flashType, isShaking, appClasses,
            
            selectBank, handleOptionClick, nextQuestion,
            resetToHome, retryMistakes, getOptionClass
        };
    }
}).mount('#app');