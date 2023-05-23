import React from 'react'
//e: React.ChangeEvent<HTMLInputElement>
//fireEvent.change(getByLabelText('Email', {exact: false}), {
  //  target: {value: 'test@test.test'},
  //nickname: 
  //real_name: 
  //origin_description: 
  //catch_phrase:
export const CreateSuperHero: React.FC = () => {
    function handleSubmit(event :React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }
    return (
        <>
            <h1>Create your Superhero</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='nickname'>Nickname</label>
                    <input name='nickname' id='nickname' type="text" />
                    <label htmlFor='realname'>Realname</label>
                    <input name='realname' id='realname' type="text" />
                    <label htmlFor='origin_description'>Origin description</label>
                    <input name='origin_description' id='origin_description' type="text" />
                    <label htmlFor='catch_phrase'>Catch phrase</label>
                    <input name='catch_phrase' id='catch_phrase' type="text" />
                <input type="submit" value='submit' />
            </form>
        </>
    )
}
