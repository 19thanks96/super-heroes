import React, { useState } from 'react'
import { createHero, updateHero } from '../api'
import { SuperHeroDTO } from '../types'
import { useNavigate } from 'react-router-dom'
import { SuperHero } from '../types'
export type SuperheroFromProps = {
    superheroes?: SuperHero
}

export const SuperHeroForm: React.FC<SuperheroFromProps> = (props) => {
    const [error, setError] = useState<string>('')
    const [nickname, setNickname] = useState<string>(
        props?.superheroes?.nickname || ''
    )
    const [real_name, setReal_name] = useState<string>(
        props?.superheroes?.real_name || ''
    )
    const [origin_description, setOrigin_description] = useState<string>(
        props?.superheroes?.origin_description || ''
    )
    const [catch_phrase, setCatch_phrase] = useState<string>(
        props?.superheroes?.catch_phrase || ''
    )
    const [images, setImages] = useState<SuperHeroDTO['images']>(null)
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (
            !images ||
            !catch_phrase ||
            !origin_description ||
            !real_name ||
            !nickname
        ) {
            setError('Please fill all fields')
            return
        }
        try {
            if (props.superheroes) {
                await updateHero({
                    ...props.superheroes,
                    nickname,
                    real_name,
                    origin_description,
                    catch_phrase,
                    images,
                })
            } else
                await createHero({
                    nickname,
                    real_name,
                    origin_description,
                    catch_phrase,
                    images,
                })
            navigate('/')
        } catch (error) {
            console.log(console.error(error))
            return
        }
    }

    return (
        <>
            <h1 className="creatingHero">Create your Superhero</h1>
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
                    name="images"
                    id="images"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setImages(event.currentTarget.files)
                    }}
                />
                {error}
                <input type="submit" id="submit" value="submit" />
            </form>
        </>
    )
}
