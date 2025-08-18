import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

function CategoryBar() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        async function fetchCategories() {
            const { data } = await axios.get('/api/products/categories/');
            setCategories(data)
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = (categoryName) => {
        navigate(`/?category=${categoryName}`)
    }

    return (
        <ButtonGroup className="mb-3">
            <Button
                variant="outline-primary"
                onClick={() => navigate('/')}
                active={!new URLSearchParams(location.search).get('category')}
            >
                All
            </Button>
            {categories.map(cat => (
                <Button
                    key={cat._id}
                    variant="outline-primary"
                    onClick={() => handleCategoryClick(cat.name)}
                    active={new URLSearchParams(location.search).get('category') === cat.name}
                >
                    {cat.name}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default CategoryBar