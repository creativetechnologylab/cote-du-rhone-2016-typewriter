#!/bin/bash
for i in {20..53}; do 
  ffmpeg -f lavfi -i color=c=blue:s=1920x1080:d=20 -vf \
    "drawtext=fontfile=Raleway-Bold.ttf:fontsize=80: \
    fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:text='$i'" \
    $i.mov
done
