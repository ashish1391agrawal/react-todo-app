import { AppBar, Box, ClickAwayListener, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core"
import { MoreVert } from '@material-ui/icons'
import { useState, MouseEvent, ReactElement } from "react"
import { Link } from "react-router-dom"
import useStyles from './styles'
import { HeaderInterface } from './types'

const Header = (properties: HeaderInterface): ReactElement => {
    const { 
        handleBackground,
        addNewList
    } = properties

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  

    const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget)

    const handleMenuClose = (): void => setAnchorEl(null)

    const isOpen = !!anchorEl
    const classes = useStyles()

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Box className={classes.headerContainer}>
                    <Typography variant="h6">
                        <Link to="/" className={classes.linkTag}>Home</Link>
                    </Typography>
                    <ClickAwayListener onClickAway={handleMenuClose}>
                        <Box>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                            >
                                <MoreVert />
                            </IconButton>
                        </Box>
                    </ClickAwayListener>
                    <Menu
                        keepMounted
                        id="long-menu"
                        open={isOpen}
                        anchorEl={anchorEl}
                    >
                        <MenuItem className={classes.fileInputContainer}>
                            Change background
                            <input 
                                type="file" 
                                accept="image/*" 
                                className={classes.fileInput}
                                onChange={handleBackground} 
                            />
                        </MenuItem>
                        <MenuItem onClick={addNewList}>Add new list</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
