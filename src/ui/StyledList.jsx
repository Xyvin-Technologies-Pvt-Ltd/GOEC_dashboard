import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import StyledDivider from './StyledDivider'

const StyledList = ({data}) => {
    return (
        <List sx={{ width: '100%', pt: 0 }}>
            {data.map((item, index) => (
            <React.Fragment key={index}>
            <ListItem sx={{ pb:0 }}>
                <ListItemText primary={item.title} secondary={item.value} />
            </ListItem>
            <StyledDivider />
            </React.Fragment>
      ))}
        </List>
    )
}

export default StyledList
