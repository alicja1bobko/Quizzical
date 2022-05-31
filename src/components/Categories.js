import React from 'react'

class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            categories: []
        }
    }


    componentDidMount() {
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    categories: result.trivia_categories
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    render() {
        const { error, categories } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else {
            return categories.map((current, i) => (
                <option key={current.name} value={current.id}>{current.name}</option>
            ))
        }
    }
}

export default Categories;