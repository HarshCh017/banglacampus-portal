import re
import os
import urllib.request
import urllib.error
import time

def main():
    os.makedirs('public/images/colleges', exist_ok=True)
    
    with open('src/data/collegePhotos.ts', 'r') as f:
        content = f.read()
    
    # Split content by top-level keys
    # Match:   'some-slug': {
    keys = re.findall(r"\n  '([a-z0-9\-]+)': \{", content)
    print(f"Found {len(keys)} college keys: {keys}")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    for i, key in enumerate(keys):
        # Find slice for this key
        start_idx = content.find(f"'{key}': {{")
        if i + 1 < len(keys):
            end_idx = content.find(f"'{keys[i+1]}': {{")
            block = content[start_idx:end_idx]
        else:
            block = content[start_idx:]
            
        print(f"\n[{i+1}/{len(keys)}] Processing {key}...")
        
        # Primary image URL
        m = re.search(r"primaryImage:\s*'([^']+)'", block)
        if m:
            url = m.group(1)
            target = f"public/images/colleges/{key}.jpg"
            if not os.path.exists(target) or os.path.getsize(target) < 5000:
                print(f"  Downloading primary: {url[:70]}...")
                try:
                    req = urllib.request.Request(url, headers=headers)
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        data = resp.read()
                        with open(target, 'wb') as f_out:
                            f_out.write(data)
                    print(f"    Saved {len(data)} bytes to {target}")
                    time.sleep(0.3)
                except Exception as e:
                    print(f"    Failed primary download: {e}")
            else:
                print(f"  Primary already exists: {target}")
                
        # Gallery URLs
        gallery_matches = re.findall(r"url:\s*'([^']+)'", block)
        for g_idx, g_url in enumerate(gallery_matches):
            g_target = f"public/images/colleges/{key}-{g_idx+1}.jpg"
            if not os.path.exists(g_target) or os.path.getsize(g_target) < 5000:
                print(f"  Downloading gallery {g_idx+1}: {g_url[:70]}...")
                try:
                    req = urllib.request.Request(g_url, headers=headers)
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        data = resp.read()
                        with open(g_target, 'wb') as f_out:
                            f_out.write(data)
                    print(f"    Saved {len(data)} bytes to {g_target}")
                    time.sleep(0.3)
                except Exception as e:
                    print(f"    Failed gallery download: {e}")
                    if os.path.exists(f"public/images/colleges/{key}.jpg"):
                        with open(f"public/images/colleges/{key}.jpg", 'rb') as src, open(g_target, 'wb') as dst:
                            dst.write(src.read())
            else:
                print(f"  Gallery {g_idx+1} already exists: {g_target}")

if __name__ == '__main__':
    main()
