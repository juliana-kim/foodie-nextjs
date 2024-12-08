'use client'

import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({lable, name}) {
    const [pickedImage, setPickedImage] = useState()
    const imageInputRef = useRef()

    function handlePickClick() {
        imageInputRef.current.click()
    }

    function handleImageChange(event) {
        const file = event.target.files[0];  // file path
        
        if(!file) {
            setPickedImage(null)
            return
        } // or setPickedImage(null)

        // 이미지 element의 src로 사용할 수 있도록 Data URL로 변화시켜야 한다. 
        const fileReader = new FileReader()

        // readAsDataURL이 실행완료된 후에 onLoad가 호출된다.
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        };

        fileReader.readAsDataURL(file); // 아무것도 리턴하지 않음. 
    }


    return (
        <div className={classes.picker}>
            <lable htmlFor={name}>{lable}</lable>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image Picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by you.' fill/>}
                </div>
                <input 
                    ref={imageInputRef}
                    className={classes.input}
                    type='file' 
                    id={name} 
                    accept='image/png, image/jpeg' 
                    name={name} 
                    onChange={handleImageChange}
                    required
                    // multiple // 여러개 파일을 선택할 수 있다.
                />
                {/* type을 button으로 하지 않으면 form type으로 제출됨 */}
                <button 
                    className={classes.button} 
                    type="button" 
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    )
}