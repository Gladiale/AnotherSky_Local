import os

# リネームしたいフォルダを指定
_dir = r'E:\HTML\@自作サービス\AnotherSky_local\public\cg-image\folder-01'

def renameFiles(folder_path):
    files = os.listdir(folder_path)

    file_list = []

    for i, f in enumerate(files):
        file_path = os.path.join(folder_path, f)

        # ファイルかどうかを判断
        if os.path.isfile(file_path):
            _extension = f.split('.')[1]
            newFileName = str((i + 1)).zfill(3)

            # if _extension == "tlg":
            #     _extension = "png"

            os.rename(file_path, f'{folder_path}\\{newFileName}.{_extension}')
            file_list.append(f'{newFileName}.{_extension}')

    print(file_list)

if __name__ == '__main__':
    renameFiles(_dir)