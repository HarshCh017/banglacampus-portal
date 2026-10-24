import os
import urllib.request
import urllib.parse
import json
import time
import subprocess
import shutil

HEADERS = {
    'User-Agent': 'BanglaCampusEducational/1.0 (https://banglacampus.in; contact@banglacampus.in)'
}

def get_wiki_thumb(wiki_file, width=960):
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(wiki_file)}&prop=imageinfo&iiprop=url&iiurlwidth={width}"
    req = urllib.request.Request(api_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                info = p.get('imageinfo', [{}])[0]
                return info.get('thumburl') or info.get('url')
    except Exception as e:
        print(f"  Error fetching thumb for {wiki_file}: {e}")
    return None

def download_file(url, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if len(data) > 3000:
                with open(out_path, 'wb') as f:
                    f.write(data)
                print(f"  Downloaded: {out_path} ({len(data)} bytes)")
                return True
            else:
                print(f"  Failed: File too small ({len(data)} bytes) for {url}")
    except Exception as e:
        print(f"  Failed download {url[:60]}: {e}")
    return False

def convert_webp_to_jpg(webp_path, jpg_path):
    try:
        subprocess.run(['sips', '-s', 'format', 'jpeg', webp_path, '--out', jpg_path], check=True, capture_output=True)
        print(f"  Converted {webp_path} -> {jpg_path}")
        return True
    except Exception as e:
        print(f"  Conversion error: {e}")
        return False

def main():
    colleges_dir = 'public/images/colleges'
    os.makedirs(colleges_dir, exist_ok=True)

    print("=== 1. UPDATING HERITAGE INSTITUTE OF TECHNOLOGY (Official Campus Buildings) ===")
    heritage_primary = 'https://www.heritageit.edu/ImageGallery/19015577504.jpg'
    download_file(heritage_primary, f'{colleges_dir}/heritage-institute-of-technology.jpg')
    download_file('https://www.heritageit.edu/ImageGallery/11986954301.jpg', f'{colleges_dir}/heritage-institute-of-technology-1.jpg')
    download_file('https://www.heritageit.edu/ImageGallery/21213766732.jpg', f'{colleges_dir}/heritage-institute-of-technology-2.jpg')
    download_file('https://www.heritageit.edu/ImageGallery/10911050693.jpg', f'{colleges_dir}/heritage-institute-of-technology-3.jpg')
    download_file('https://www.heritageit.edu/ImageGallery/19015577504.jpg', f'{colleges_dir}/heritage-institute-of-technology-4.jpg')

    print("\n=== 2. UPDATING MCKV INSTITUTE OF ENGINEERING (Official Banners & Campus) ===")
    mckv_wiki = get_wiki_thumb('File:Mckvie College Campus.jpg', 960)
    if mckv_wiki:
        download_file(mckv_wiki, f'{colleges_dir}/mckv-institute-of-engineering-1.jpg')

    # MCKV Banner 1
    tmp_webp = '/tmp/mckv_banner1.webp'
    if download_file('https://www.mckvie.edu.in/images/banner/banner1.webp', tmp_webp):
        convert_webp_to_jpg(tmp_webp, f'{colleges_dir}/mckv-institute-of-engineering.jpg')
        shutil.copyfile(f'{colleges_dir}/mckv-institute-of-engineering.jpg', f'{colleges_dir}/mckv-institute-of-engineering-2.jpg')

    # MCKV Banner 2
    tmp_webp2 = '/tmp/mckv_banner2.webp'
    if download_file('https://www.mckvie.edu.in/images/banner/banner2-new.webp', tmp_webp2):
        convert_webp_to_jpg(tmp_webp2, f'{colleges_dir}/mckv-institute-of-engineering-3.jpg')
        shutil.copyfile(f'{colleges_dir}/mckv-institute-of-engineering-3.jpg', f'{colleges_dir}/mckv-institute-of-engineering-4.jpg')

    print("\n=== 3. UPDATING GCETTS SERAMPORE (Authentic Textile Tech Campus, Not Serampore College) ===")
    gcetts_main = get_wiki_thumb('File:Textile college,Serampore.jpg', 960)
    if gcetts_main:
        download_file(gcetts_main, f'{colleges_dir}/government-college-engineering-textile-technology-serampore.jpg')
        download_file(gcetts_main, f'{colleges_dir}/government-college-engineering-textile-technology-serampore-1.jpg')
    
    gcetts_admin = get_wiki_thumb('File:Admin building gcetts.jpg', 960)
    if gcetts_admin:
        download_file(gcetts_admin, f'{colleges_dir}/government-college-engineering-textile-technology-serampore-2.jpg')
        
    gcetts_gate = get_wiki_thumb('File:Textile college gate 02.jpg', 960)
    if gcetts_gate:
        download_file(gcetts_gate, f'{colleges_dir}/government-college-engineering-textile-technology-serampore-3.jpg')

    gcetts_hostel = get_wiki_thumb('File:Hostel gcetts.jpg', 960)
    if gcetts_hostel:
        download_file(gcetts_hostel, f'{colleges_dir}/government-college-engineering-textile-technology-serampore-4.jpg')

    print("\n=== 4. UPDATING UIT BURDWAN UNIVERSITY (Authentic UITBU Building & Library) ===")
    uit_main = get_wiki_thumb('File:Uitbu.jpg', 960)
    if uit_main:
        download_file(uit_main, f'{colleges_dir}/uit-burdwan-university.jpg')
        download_file(uit_main, f'{colleges_dir}/uit-burdwan-university-1.jpg')
    
    uit_lib = get_wiki_thumb('File:Library of UIT.jpg', 960)
    if uit_lib:
        download_file(uit_lib, f'{colleges_dir}/uit-burdwan-university-2.jpg')
        
    uit_gate = get_wiki_thumb('File:Main Gate of UIT.jpg', 960)
    if uit_gate:
        download_file(uit_gate, f'{colleges_dir}/uit-burdwan-university-3.jpg')

    uit_play = get_wiki_thumb('File:Playground of UIT.jpg', 960)
    if uit_play:
        download_file(uit_play, f'{colleges_dir}/uit-burdwan-university-4.jpg')

    print("\n=== 5. UPDATING KGEC KALYANI GALLERY (Distinct Authentic Campus Views) ===")
    kgec_02 = get_wiki_thumb('File:Kalyani Govt. Engineering College 02.jpg', 960)
    if kgec_02: download_file(kgec_02, f'{colleges_dir}/kalyani-government-engineering-college-2.jpg')
    kgec_09 = get_wiki_thumb('File:Kalyani Govt. Engineering College 09.jpg', 960)
    if kgec_09: download_file(kgec_09, f'{colleges_dir}/kalyani-government-engineering-college-3.jpg')
    kgec_05 = get_wiki_thumb('File:Kalyani Govt. Engineering College 05.jpg', 960)
    if kgec_05: download_file(kgec_05, f'{colleges_dir}/kalyani-government-engineering-college-4.jpg')

    print("\n=== 6. UPDATING GCELT SALT LAKE GALLERY (Distinct Campus Views) ===")
    gcelt_10 = get_wiki_thumb('File:Government College of Engineering and Leather Technology building and campus in Salt Lake, Kolkata 10.jpg', 960)
    if gcelt_10: download_file(gcelt_10, f'{colleges_dir}/government-college-engineering-leather-technology-2.jpg')
    gcelt_04 = get_wiki_thumb('File:Government College of Engineering and Leather Technology building and campus in Salt Lake, Kolkata 04.jpg', 960)
    if gcelt_04: download_file(gcelt_04, f'{colleges_dir}/government-college-engineering-leather-technology-3.jpg')
    gcelt_08 = get_wiki_thumb('File:Government College of Engineering and Leather Technology building and campus in Salt Lake, Kolkata 08.jpg', 960)
    if gcelt_08: download_file(gcelt_08, f'{colleges_dir}/government-college-engineering-leather-technology-4.jpg')

    print("\n=== 7. UPDATING NSEC GARIA GALLERY (Distinct Academic Blocks) ===")
    nsec_87 = get_wiki_thumb('File:Netaji Subhash Engineering College - Panchpota - Kolkata 2012-01-25 1287.JPG', 960)
    if nsec_87: download_file(nsec_87, f'{colleges_dir}/netaji-subhash-engineering-college-2.jpg')
    nsec_85 = get_wiki_thumb('File:Netaji Subhash Engineering College - Panchpota - Kolkata 2012-01-25 1285.JPG', 960)
    if nsec_85: download_file(nsec_85, f'{colleges_dir}/netaji-subhash-engineering-college-3.jpg')
    nsec_88 = get_wiki_thumb('File:Netaji Subhash Engineering College - Panchpota - Kolkata 2012-01-25 1288.JPG', 960)
    if nsec_88: download_file(nsec_88, f'{colleges_dir}/netaji-subhash-engineering-college-4.jpg')

    print("\n=== 8. UPDATING TECHNO MAIN SALT LAKE GALLERY ===")
    techno_90 = get_wiki_thumb('File:Techno India University - EM 4 Sector V - Salt Lake City - Kolkata 2017-04-29 1690.JPG', 960)
    if techno_90:
        download_file(techno_90, f'{colleges_dir}/techno-main-salt-lake-2.jpg')

    print("\n=== 9. UPDATING ASANSOL ENGINEERING COLLEGE GALLERY ===")
    aec_main = get_wiki_thumb('File:Asansol Engineering College.jpg', 960)
    if aec_main:
        download_file(aec_main, f'{colleges_dir}/asansol-engineering-college-2.jpg')

    print("\n=== 10. UPDATING JALPAIGURI GOVT ENGINEERING COLLEGE GALLERY ===")
    jgec_side = get_wiki_thumb('File:College building side view.jpg', 960)
    if jgec_side:
        download_file(jgec_side, f'{colleges_dir}/jalpaiguri-government-engineering-college-2.jpg')
    jgec_gate = get_wiki_thumb('File:The Gateway to JGEC.jpg', 960)
    if jgec_gate:
        download_file(jgec_gate, f'{colleges_dir}/jalpaiguri-government-engineering-college-3.jpg')

    print("\n=== 11. UPDATING NARULA INSTITUTE OF TECHNOLOGY GALLERY ===")
    narula_main_acad = get_wiki_thumb('File:Narula Institute of Technology Main academic building.jpg', 960)
    if narula_main_acad:
        download_file(narula_main_acad, f'{colleges_dir}/narula-institute-of-technology-2.jpg')

    print("\n=== 12. UPDATING JADAVPUR UNIVERSITY GALLERY ===")
    ju_gate4 = get_wiki_thumb('File:Jadavpur University Gate No. 4.jpg', 960)
    if ju_gate4:
        download_file(ju_gate4, f'{colleges_dir}/jadavpur-university-engineering-2.jpg')
    ju_alumni = get_wiki_thumb('File:Alumni Association Building of Jadavpur University photographed during Bengali Wikipedia 10th Anniversary Celebration Jadavpur University Campus5830.jpg', 960)
    if ju_alumni:
        download_file(ju_alumni, f'{colleges_dir}/jadavpur-university-engineering-3.jpg')

    print("\n=== 13. UPDATING IEM KOLKATA GALLERY ===")
    iem_02 = get_wiki_thumb('File:Institute of Engineering and Management 02.jpg', 960)
    if iem_02:
        download_file(iem_02, f'{colleges_dir}/iem-kolkata-2.jpg')

    print("\nPhoto refresh complete! Checking sizes...")

if __name__ == '__main__':
    main()
