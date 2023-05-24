import React, { useState } from 'react'
import { createHero } from '../api'
import { SuperHero } from '../types'

export const CreateSuperHero: React.FC = () => {
    const [nickname, setNickname] = useState<string>('')
    const [real_name, setReal_name] = useState<string>('')
    const [origin_description, setOrigin_description] = useState<string>('')
    const [catch_phrase, setCatch_phrase] = useState<string>('')
    const [images, setImages] = useState<SuperHero['images']>(null)


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await createHero({
                nickname,
                real_name,
                origin_description,
                catch_phrase,
                images
            })
        } catch (error) {
            console.log(console.error(error))
        }
    }

    return (
        <>
            <h1>Create your Superhero</h1>
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

                <label htmlFor="img">Catch phrase</label>
                <input
                    name="images"
                    id="images"
                    type="file"
                    //multiple
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setImages(event.currentTarget.files)
                    }}
                />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}
