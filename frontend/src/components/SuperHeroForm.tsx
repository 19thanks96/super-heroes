import React, { useState } from 'react'
import { createHero, updateHero, url, deleteImg } from '../api'
import { SuperHeroDTO } from '../types'
import { useNavigate } from 'react-router-dom'
import { SuperHero } from '../types'
export type SuperheroFromProps = {
    hero?: SuperHero
}

export const SuperHeroForm: React.FC<SuperheroFromProps> = (props) => {
    const [error, setError] = useState<string>('')
    const [nickname, setNickname] = useState<string>(
        props?.hero?.nickname || ''
    )
    const [real_name, setReal_name] = useState<string>(
        props?.hero?.real_name || ''
    )
    const [origin_description, setOrigin_description] = useState<string>(
        props?.hero?.origin_description || ''
    )
    const [catch_phrase, setCatch_phrase] = useState<string>(
        props?.hero?.catch_phrase || ''
    )
    const [imageFiles, setImageFiles] = useState<SuperHeroDTO['images']>(null)
    const [imageLinks, setImageLinks] = useState<SuperHero['images']>(
        props?.hero?.images || []
    )
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (
            !(imageFiles || imageLinks.length) ||
            !catch_phrase ||
            !origin_description ||
            !real_name ||
            !nickname
        ) {
            setError('Please fill all fields')
            return
        }
        try {
            if (props.hero) {
                await updateHero({
                    ...props.hero,
                    nickname,
                    real_name,
                    origin_description,
                    catch_phrase,
                    images: imageFiles,
                })
            } else
                await createHero({
                    nickname,
                    real_name,
                    origin_description,
                    catch_phrase,
                    images: imageFiles,
                })
            navigate('/')
        } catch (error) {
            console.log(console.error(error))
            return
        }
    }
    async function handleDeleteImgBtnClick(imgToDelete: string) {
        await deleteImg(imgToDelete, props.hero)
        const updatedImg = imageLinks.filter((imageLink) => {
            return imageLink !== imgToDelete
        })
        setImageLinks(updatedImg)
    }
    const imageElements = imageLinks.map((imageLink) => {
        return (
            <div key={imageLink} className="editpage__image">
                <img src={url + '/' + imageLink}></img>
                <button
                    onClick={() => {
                        handleDeleteImgBtnClick(imageLink)
                    }}
                    type="button"
                >
                    Delete{' '}
                </button>
            </div>
        )
    })
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nickname">Nickname</label>
                <input
                    name="nickname"
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNickname(event?.target.value)
                    }}
                />

                <label htmlFor="realname">Realname</label>
                <input
                    name="realname"
                    id="realname"
                    type="text"
                    value={real_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setReal_name(event?.target.value)
                    }}
                />

                <label htmlFor="origin_description">Origin description</label>
                <input
                    name="origin_description"
                    id="origin_description"
                    type="text"
                    value={origin_description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setOrigin_description(event?.target.value)
                    }}
                />

                <label htmlFor="catch_phrase">Catch phrase</label>
                <input
                    name="catch_phrase"
                    id="catch_phrase"
                    type="text"
                    value={catch_phrase}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCatch_phrase(event?.target.value)
                    }}
                />

                <label htmlFor="img">Add your Image</label>
                <input
                    name="files"
                    id="images"
                    multiple
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setImageFiles(event.currentTarget.files)
                    }}
                />
                <h2 className='error'>{error}</h2>
                <h2 className='upload'> Uploaded Images</h2>
                <div>{imageElements}</div>
                <input type="submit" id="submit" value="submit" />
            </form>
        </>
    )
}
