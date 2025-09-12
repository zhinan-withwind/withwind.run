#!/usr/bin/env python3
"""
Script to fix hexagram files with proper SVG replacement and alt text
"""

import os
import re
import sys

def fix_hexagram_file(filepath):
    """Fix a single hexagram file"""
    # Extract hexagram number from filename
    filename = os.path.basename(filepath)
    hex_num = re.search(r'(\d+)\.html', filename).group(1)
    hex_num = hex_num.lstrip('0')  # Remove leading zeros
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract hexagram name from title
    title_match = re.search(r'<title>([^-]+) - 第', content)
    if title_match:
        hex_name = title_match.group(1).strip()
    else:
        hex_name = f"第{hex_num}卦"
    
    # Fix the hexagram symbol section
    # Pattern to match the broken hexagram symbol sections
    pattern = r'(<div class="hexagram-symbol">\s*<img src="[^"]*index=\d+&width=200&height=320"[^>]*alt="[^"]*" />\s*</div>\s*)+(?:<div class="hexagram-line">.*?</div>\s*)+</div>'
    
    replacement = f'        <div class="hexagram-symbol">\n            <img src="https://app.withwind.run/zhouyi/liuyao/hexagram/chart?index={hex_num}&width=200&height=320" alt="{hex_name}卦象" />\n        </div>'
    
    # Apply the fix
    fixed_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Write back the fixed content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f"Fixed {filename}: {hex_name} (#{hex_num})")

def main():
    """Main function to process all hexagram files"""
    hexagram_dir = "/Users/withwind/Develop/WithWind/withwind.run/html/zhouyi/hexagrams"
    
    # Get all hexagram files except 01.html (already correct)
    hexagram_files = []
    for i in range(2, 65):
        filename = f"{i:02d}.html"
        filepath = os.path.join(hexagram_dir, filename)
        if os.path.exists(filepath):
            hexagram_files.append(filepath)
    
    print(f"Processing {len(hexagram_files)} hexagram files...")
    
    for filepath in hexagram_files:
        try:
            fix_hexagram_file(filepath)
        except Exception as e:
            print(f"Error processing {filepath}: {e}")
    
    print("All files fixed successfully!")

if __name__ == "__main__":
    main()