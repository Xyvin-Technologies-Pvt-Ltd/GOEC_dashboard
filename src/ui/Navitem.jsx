import PropTypes from 'prop-types';
import { Box, Button, Collapse, ListItem, Stack } from '@mui/material';
import { ReactComponent as ArrowDropdown } from '../assets/icons/arrow_drop_down.svg';
import { useNavigate  } from 'react-router-dom'

export const NavItem = (props) => {
    const { href, icon, title, sub, extendable,active,indexChange, ...others } = props;
    const navigate = useNavigate();
    let activeIndex = -1;
    let activ = active;
    sub && sub.forEach((element,ind) => {
        if(window.location.pathname.substring(1,window.location.pathname.length) === element.href){
            activeIndex  = ind
            activ = true
            return
        }
    });
    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 0,
            }}
            {...others}
        >
            <Button
                component="a"
                startIcon={icon}
                endIcon={extendable ? <ArrowDropdown style={{fill:'#fff'}} /> :<></>}
                disableRipple
                onClick={()=>{
                    if (!extendable) {
                        navigate(`/${href}`);
                    } else {
                        // Existing logic for extendable items
                        if (active && typeof indexChange === 'function') {
                            indexChange();
                        }
                    } 
                }}
                sx={{
                    backgroundColor: activ && 'secondary.contrast',
                    borderRadius: 0,
                    height: '47px',
                    color: activ ? '#FFF' : 'secondary.contrastText',
                    fontWeight: '20px',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                        color: activ ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255, 0.08)'
                    }
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
            </Button>
            <Collapse in={activ && extendable} sx={{
                    backgroundColor: activ && 'secondary.contrast',
                    width: '100%',
                }}>
                    <Stack
                        sx={{
                            margin: '10px 20px 15px 30px',
                            padding: '0px 0px 0px 10px',
                            borderLeft: 'solid 1px #4A4458'
                        }}>
                        {
                            activ && sub && sub.map((item,index) => {
                                return (
                                    <Button sx={{
                                        backgroundColor: activeIndex === index ? 'secondary.button' : 'secondary.contrast',
                                        borderRadius: 0.5,
                                        height: '35px',
                                        my: 0.5,
                                        justifyContent: "flex-start",
                                        color: activ ? '#fff' : 'primary.contrastText',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255, 0.1)'
                                        }
                                    }}
                                    onClick={()=>{navigate(`/${item.href}`);}}
                                    key={index}>
                                        {item.title}
                                    </Button>
                                )
                            })
                        }
                    </Stack>
                </Collapse>
        </ListItem>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string,
    sub: PropTypes.array
};
