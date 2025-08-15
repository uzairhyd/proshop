import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if (pages <= 1) return null

    return (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={{
                        pathname: isAdmin ? '/admin/productlist/' : '/',
                        search: `?keyword=${keyword}&page=${x + 1}`,
                    }}
                    activeClassName=""
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate