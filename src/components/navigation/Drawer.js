import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { NavLink } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function NavigationDrawer() {
  const [state, setState] = React.useState(false);
  const [open, setOpen] = React.useState(true) //
  const [productList, setProductList] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(response => setProductList(response))
    .catch(error => console.error(error))
  }, [])

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const handleClick = () => {
    setOpen(!open);
  }
  console.log(productList)

  const list = (anchor) => (
<>

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor)}
      // onKeyDown={toggleDrawer(anchor)}
    >
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Products">
          {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemText>
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
        </ListItemButton>
        
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {productList.map((element) => (
          <ListItem key={element.product_id}>
            <ListItemButton sx={{ pl: 4 }}>
              <NavLink to= {`/Product-Page/${element.product_id}`}>
                <ListItemText primary={element.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
          ))}
        </List>
      </Collapse>
      <Divider /> 
      <List>
        <ListItemButton >
          <NavLink to="/Delivery">
            <ListItemText primary='Delivery Info'/>
          </NavLink>
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton >
          <NavLink to="/Login">
            <ListItemText primary='Login'/>
          </NavLink>
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton >
          <NavLink to="/Register">
            <ListItemText primary='Register account'/>
          </NavLink>
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemText primary='Logout'/>
        </ListItemButton>
      </List>
      <Divider />
      
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

    </Box>
    </>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><img className='nav-img burger' src='images/hamburger-menu-icon-svg-7.png' alt=''/></Button>
      <Drawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}