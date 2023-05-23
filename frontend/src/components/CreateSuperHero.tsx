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
                
                <input type="submit" value='submit' />
            </form>
        </>
    )
}
