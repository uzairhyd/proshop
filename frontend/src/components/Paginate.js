import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if (pages <= 1) return null

    return (
        <Pagination>
            {[...Array(pages).keys()].map((x) => {
                // Only include keyword if it's not empty
                let search = keyword
                    ? `?keyword=${keyword}&page=${x + 1}`
                    : `?page=${x + 1}`

                return (
                    <LinkContainer
                        key={x + 1}
                        to={{
                            pathname: isAdmin ? '/admin/productlist/' : '/',
                            search: search
                        }}
                    >
                        <Pagination.Item active={x + 1 === Number(page)}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                )
            })}
        </Pagination>
    )
}

export default Paginate