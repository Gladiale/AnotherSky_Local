import os

# ファイル名を取得したいフォルダを指定
_dir = r'E:\HTML\@自作サービス\AnotherSky_local\public\voice\sound'

def getFileNameList(folder_path):
    files = os.listdir(folder_path)

    file_list = []

    for i, f in enumerate(files):
        file_path = os.path.join(folder_path, f)

        # ファイルかどうかを判断
        if os.path.isfile(file_path):
            file_list.append(f)

    print(file_list)

if __name__ == '__main__':
    getFileNameList(_dir)