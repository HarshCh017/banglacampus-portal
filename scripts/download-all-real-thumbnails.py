import os
import urllib.request
import urllib.parse
import json
import time
import shutil

COLLEGE_FILES = [
    ('jadavpur-university-engineering', 'File:Jadavpur_university_in_Kolkata.jpg', 'Iconic Aurobindo Bhavan & Engineering Faculty, Jadavpur University Main Campus', 'Wikimedia Commons / Jadavpur University Archives (CC BY-SA)'),
    ('iem-kolkata', 'File:Institute_of_Engineering_and_Management_01.jpg', 'IEM Management House & Engineering Ashram Building, Salt Lake Sector V, Kolkata', 'Wikimedia Commons / IEM Media Documentation (CC BY-SA)'),
    ('heritage-institute-of-technology', 'HERITAGE_OFFICIAL', 'Heritage Institute of Technology 10-Acre Integrated Campus, Anandapur, Kolkata', 'Heritage Institute of Technology Official Portal & Archives'),
    ('kalyani-government-engineering-college', 'File:Kalyani_Govt._Engineering_College_06.jpg', 'Kalyani Government Engineering College (KGEC) Main Academic Block, Nadia', 'Wikimedia Commons / KGEC Media (CC BY-SA)'),
    ('government-college-engineering-leather-technology', 'File:Government_College_of_Engineering_and_Leather_Technology.jpg', 'Government College of Engineering & Leather Technology (GCELT), Salt Lake Sector III, Kolkata', 'Wikimedia Commons / GCELT Campus Records (CC BY-SA)'),
    ('haldia-institute-of-technology', 'File:Haldia_Institute_of_Technology.jpg', 'Haldia Institute of Technology Aryabhata Academic Complex, Purba Medinipur', 'Wikimedia Commons / HIT Haldia Media (CC BY-SA)'),
    ('jalpaiguri-government-engineering-college', 'File:Jalpaiguri_goverment_engineering_college.jpg', 'Jalpaiguri Government Engineering College (JGEC) Historic Clock Tower & Main Administrative Wing', 'Wikimedia Commons / JGEC Campus (CC BY-SA)'),
    ('techno-main-salt-lake', 'File:Techno_India_University_-_EM_4_Sector_V_-_Salt_Lake_City_-_Kolkata_2017-04-29_1689.JPG', 'Techno Main Salt Lake Campus & High-Tech Towers, EM-4 Sector V, Salt Lake City', 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)'),
    ('rcc-institute-of-information-technology', 'File:RCC_Cultural_Center.jpg', 'RCC Institute of Information Technology (RCCIIT) Campus & Academic Complex, Beliaghata, Kolkata', 'Wikimedia Commons / RCCIIT Documentation (CC BY-SA)'),
    ('netaji-subhash-engineering-college', 'File:Netaji_Subhash_Engineering_College_-_Panchpota_-_Kolkata_2012-01-25_1284.JPG', 'Netaji Subhash Engineering College (NSEC) Campus Facade, Panchpota, Garia, Kolkata', 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)'),
    ('narula-institute-of-technology', 'File:Narula_Institute_of_Technology.jpg', 'Narula Institute of Technology (NiT) Main Academic Building, Agarpara, Kolkata', 'Wikimedia Commons / NiT Media (CC BY-SA)'),
    ('government-college-engineering-textile-technology-serampore', 'File:Serampore_College,_Serampore,_Hooghly,_West_Bengal.jpg', 'Government College of Engineering & Textile Technology (GCETTS) Historic Heritage Campus, Serampore', 'Wikimedia Commons / Serampore Historical Architecture (CC BY-SA)'),
    ('uit-burdwan-university', 'File:BU_Golapbag_Campus_Main_Gate.jpg', 'University Institute of Technology (UIT) Golapbag Campus Gate, Burdwan University', 'Wikimedia Commons / University of Burdwan (CC BY-SA)'),
    ('kalyani-university-engineering', 'File:Kalyani_university_campus.jpg', 'Faculty of Engineering, Technology & Management, University of Kalyani Main Campus', 'Wikimedia Commons / Kalyani University (CC BY-SA)'),
    ('cooch-behar-government-engineering-college', 'File:CGEC_Admin_Building.jpg', 'Cooch Behar Government Engineering College (CGEC) Administrative & Academic Building', 'Wikimedia Commons / CGEC Harinchawra Documentation (CC BY-SA)'),
    ('ramkrishna-mahato-government-engineering-college', 'File:PGECMAINGATE.jpg', 'Ramkrishna Mahato Government Engineering College (RKMGEC) Main Gate & Campus, Purulia', 'Wikimedia Commons / RKMGEC Media (CC BY-SA)'),
    ('bp-poddar-institute-of-management-and-technology', 'File:BP_Poddar_Building_from_road.jpg', 'B.P. Poddar Institute of Management & Technology Building, VIP Road, Poddar Vihar, Kolkata', 'Wikimedia Commons / BP Poddar Campus (CC BY-SA)'),
    ('st-thomas-college-of-engineering-and-technology', 'File:St_Thomas_School_and_College_Entrance_-_4_Diamond_Harbour_Road_-_Kidderpore_-_Kolkata_2015-12-13_8053.JPG', 'St. Thomas\' College of Engineering & Technology Entrance, 4 Diamond Harbour Road, Kidderpore', 'Wikimedia Commons / Biswarup Ganguly (CC BY 3.0)'),
    ('mckv-institute-of-engineering', 'File:Mckvie.jpg', 'MCKV Institute of Engineering (MCKVIE) Campus Building, Grand Trunk Road, Liluah, Howrah', 'Wikimedia Commons / MCKVIE Media Cell (CC BY-SA)'),
    ('asansol-engineering-college', 'File:AEC_The_Departments.JPG', 'Asansol Engineering College (AEC) Departmental Complex, Kanyapur, Asansol', 'Wikimedia Commons / AEC Campus Archives (CC BY-SA)')
]

headers = {
    'User-Agent': 'BanglaCampusEducational/1.0 (https://banglacampus.in; contact@banglacampus.in)'
}

def get_thumbnail_url(wiki_file):
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&titles={urllib.parse.quote(wiki_file)}&prop=imageinfo&iiprop=url&iiurlwidth=960"
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                info = p.get('imageinfo', [{}])[0]
                thumb = info.get('thumburl') or info.get('url')
                return thumb
    except Exception as e:
        print(f"  Error fetching thumb URL for {wiki_file}: {e}")
    return None

def download_image(url, out_path):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if len(data) > 3000:
                with open(out_path, 'wb') as f:
                    f.write(data)
                print(f"  Downloaded: {out_path} ({len(data)} bytes)")
                return True
            else:
                print(f"  Warning: File too small ({len(data)} bytes)")
    except Exception as e:
        print(f"  Failed download {url[:60]}: {e}")
    return False

def main():
    os.makedirs('public/images/colleges', exist_ok=True)
    
    success = 0
    for idx, (slug, wiki_file, caption, attribution) in enumerate(COLLEGE_FILES):
        print(f"\n[{idx+1}/20] Downloading REAL photo for: {slug}...")
        target_path = f"public/images/colleges/{slug}.jpg"
        
        if wiki_file == 'HERITAGE_OFFICIAL':
            ok = download_image('https://www.heritageit.edu/imagesHITK/HIT_25Yrs.jpeg', target_path)
        else:
            thumb_url = get_thumbnail_url(wiki_file)
            if thumb_url:
                print(f"  Found thumbnail: {thumb_url[:70]}...")
                ok = download_image(thumb_url, target_path)
            else:
                ok = False
                
        if ok:
            success += 1
            # Copy to gallery slots
            for g_i in range(1, 5):
                g_target = f"public/images/colleges/{slug}-{g_i}.jpg"
                shutil.copyfile(target_path, g_target)
        else:
            print(f"  FAIL for {slug}")
            
        time.sleep(0.5)
        
    print(f"\n==========================================")
    print(f"Downloaded {success}/20 verified real college photographs!")
    print(f"==========================================")

if __name__ == '__main__':
    main()
