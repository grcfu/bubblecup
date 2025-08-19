import './App.css'
import React, { useState, useEffect } from 'react'
import raw from './recipe.txt'; // Relative path to this file

function Form() {
    const [query, setQuery] = useState('')
    const [recipe, setRecipe] = useState([])

    const handleChange = (event) => setQuery(event.target.value)
    const handleSubmit = (event) => event.preventDefault()

    useEffect(() => {
        fetch(raw)
            .then(result => result.text())
            .then(text => setRecipe(text))
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="price"
                    type="text"
                    placeholder="<insert recipe name>"
                    value={query}
                    onChange={handleChange} />
            </form >
            <RecipeList
                recipe={recipe}
                query={query} />
        </div>
    )
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function RecipeList(props) {
    return props.recipe.toString().split("\n\n")
        .filter(recipe => {
            const lines = recipe.split("\n")
            const name = lines[0]
            return name.toLowerCase().includes(props.query.toLowerCase())
        })
        .map((recipe, i) => {
            const lines = recipe.split("\n")
            const name = capitalizeFirstLetter(lines[0].trim())
            const nameArray = name.split("(")
            if (nameArray.length < 2) {
                return
            }
            const nameEnglish = nameArray[0]
            const nameChinese = nameArray[1].toLowerCase()

            const body = lines.slice(1, lines.length)
            return <div key={i}>
                <div className="recipeName">{nameEnglish} 
                <span className="recipeChinese">({nameChinese}</span></div>
                <div className="recipeBody">{body}</div>
            </div>
        })
}

function App() {
    return (
        <div className="App">
            <Form />
        </div>
    )
}

export default App;
