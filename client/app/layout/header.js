import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ProfileDropDown from '../components/profile_drop_down'
import '../styles/header.scss';

export default ()=>{
  const [user,setUser] = useState({})
  const [isProfileVisible,setIsProfileVisible] = useState(false)
  useEffect(()=>{
    axios.get('/api/user')
    .then(res=>{
      const value = res.data
      setUser(value)
    })      
  },[])
  const onProfileClickHandler = ()=>{
    setIsProfileVisible(!isProfileVisible)
  }
  let image = ()=>{
    if(user && 'avatar_url' in user){
      return <figure className="image fourty" onClick={()=>onProfileClickHandler()}>
                <img src={user.avatar_url} alt="" className="is-rounded"/>
              </figure>
    }
    return null
  }
    return <div className="container is-marginless is-fullhd">
              <nav className="navbar is-black" role="navigation" aria-label="main navigation">
                <div id="navbarBasicExample" className="navbar-menu">
                   <div className="navbar-end">
                   <div className="container is-fluid">
                      <div className="navbar-item">
                        <div className="buttons">
                          {image()}
                          <ProfileDropDown isVisible={isProfileVisible} userData={user}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav> 
            </div>
  }
