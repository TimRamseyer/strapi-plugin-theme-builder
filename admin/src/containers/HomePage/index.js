/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect  } from 'react';
import WebFont from 'webfontloader';
import styled, { ThemeProvider } from "styled-components";
import _ from 'lodash';
import {request} from "strapi-helper-plugin";
import { Container, Block } from "../../components/strapiStyled";
import { GlobalStyles } from './GlobalStyles'
import pluginPkg from '../../../../package.json';
import { InputText, Button, Padded } from "@buffetjs/core";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader
} from "strapi-helper-plugin";
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  //console.log("Plugin Description", pluginDescription)

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

  
  const ThemedButton = styled.button`
  border: 0;
  display: inline-block;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 5px;
  width: 100%;
  cursor: pointer;
`;

const Wrapper = styled.li`
  padding: 15px; 
  text-align: center;
  border-radius: 4px;
  border: 1px solid #000;
  list-style: none;
  width: 240px;
`;

const ThemeCardWrapper = styled.div`
width: 75%;
float: left;
`;

const ThemePreviewWrapper = styled.div`
width: 25%;
float: left;
`;

const Container2 = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 3rem;
  padding: 10px;
`;

 

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [themes, setThemes] =useState([])
  const [theme, setTheme] = useState();
  const [themeLoaded, setThemeLoaded] = useState(false);
const [fonts, setFonts] = useState([])
const [siteThemeId, setSiteThemeId] = useState('')
  
  /*const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes, 'font'));
    return allFonts;
  }*/
  useEffect(()=>{
fetch("http://localhost:1337/style").then(response=>response.json())
.then(json =>{console.log("The style theme id" , json.theme.id)
setSiteThemeId(json.theme.id)
})

  },[siteThemeId])
  
  const getThemes =()=>{ 
    let newTheme
     fetch("http://localhost:1337/themesData") // TODO take out http://localhost:1337 when finished running dev --admin 
    .then(response => response.json())
    .then(json => {console.log("Hopefully the returned json object",json),
  setThemes(json),
  setFonts(json.font),
  newTheme = json[0]
  localStorage.setItem('themechange', JSON.stringify(newTheme)),
  setTheme(JSON.parse(localStorage.getItem('themechange')))

  
  });
  
}

function setDefaultTheme(props){
  console.log("The theme to be send to strapi styles",props)
  fetch("http://localhost:1337/style", {
    method: 'PUT',
    body: JSON.stringify({theme: props}),
    headers: {
        'Content-type': 'application/json',
        
    }
    
}) 
}

const DeleteTheme = async() =>{
if(theme.id == siteThemeId){
  strapi.notification.toggle({type:"warning" ,message:"The Theme is currently being used as the sites theme. Select another theme for your site before you delete this theme",blockTransition:true})
} else {
  strapi.notification.toggle({type:"warning" ,message:"Deleting the Theme"})
  //console.log("the id in the delete function ", theme.id)
  setLoading(true)
  await fetch(`http://localhost:1337/themesData/${theme.id}`, {method: 'DELETE'})
  
    const req = await fetch("http://localhost:1337/themesData",{method:'GET'}) // TODO take out http://localhost:1337 when finished running dev --admin 
  const res = await req.json()
  //console.log("the res", res)
  //console.log("the res[0] ", res[0])
  let newTheme = res[0]
  setThemes(res),
  
  localStorage.setItem('themechange', JSON.stringify(newTheme))
  setTheme(JSON.parse(localStorage.getItem('themechange')),
  setLoading(false)
    )
  }}

const getFonts = () => {
  const allFonts = themes.map(a => a.font);
  console.log("Get Fonts",allFonts)
  return allFonts;
  
}
/*const setMode = mode => {
  localStorage.setItem('theme', mode)
  setTheme(mode);
};*/





  useEffect(()=>{
   
   getThemes()
    setLoading(false)
    
  },[])

  useEffect(()=>{
    console.log("The theme in useState above the themes.length",theme)
    if(themes.length>1){
      console.log("The themes in the useState",themes)

      WebFont.load({
        google: {
          families: getFonts()
        }
      });
      //localStorage.setItem('themes', JSON.stringify(themes))
     // localStorage.setItem('fonts',getFonts())
      let localTheme = JSON.parse(localStorage.getItem('themechange'));
      console.log("The local Theme", localTheme)
      localTheme ? setTheme(localTheme) : setTheme(themes[0]);
      setThemeLoaded(true);
    }
   
    
  },[themes])

  useEffect(()=>{
    console.log("I've re-rendered")
  })

  const ThemeCard = props => {
    console.log("The Fonts", getFonts())
    console.log("The props in the ThemeCard", props)
    console.log("The font", props.theme.font)
    return(
      <>
      {console.log("The value of Theme", theme)}
      <div style={{marginLeft:'auto', marginRight:'auto', marginBottom:'10px'}}>
       {props.theme.id == siteThemeId?(
<div style={{backgroundColor:"yellow", border:"1px solid black", position: "absolute",padding: "2px"}}><span>Current Site Theme</span></div>
      ):null}
      <Wrapper className="theWrapper" key={props.theme.colors.id}
        style={{backgroundColor: `${props.theme.colors.body}`, color: `${props.theme.colors.text}`, fontFamily: `${props.theme.font}`}}>
         
        <h1 style={{minHeight:"60px"}}>{props.theme.name}</h1>
        <p style={{minHeight:"80px"}} key={props.theme.font}>{props.theme.description}</p>
        <ThemedButton 
        key={props.theme.id}
          onClick={ () => setTheme(props.theme) }
          style={{backgroundColor: `${props.theme.colors.button.background}`, color: `${props.theme.colors.button.text}`, fontFamily: `${props.theme.font}`}}>
          Preview
        </ThemedButton>
      </Wrapper>
      </div>
      </>
    )
  }

  return(

  <>
  {loading?(
    <LoadingIndicator />
  ):(
    <>
    {themeLoaded &&
<div className="col-md-12">
  <Container className="theContainer">
  <PluginHeader
  icon={icon}
    title={name}
    description={pluginDescription}
  /> {/* Use Strapi Helper to set plugin title and description */}
  <HeaderNav
    links={[
      {
        name: "Theme Selector",
        to: getUrl("")
      },
      {
        name: "Theme Creator",
        to: getUrl("creator")
      }
    ]}
    style={{ marginTop: "4.4rem" }}
  />
  <div className="row">
    <Block title="Theme Selector">

      <h1>Choose a Theme for your site</h1>
      <ThemeCardWrapper>
<ul style={{padding: '10px', display: 'flex',
  flexWrap: 'wrap'}}> {/*was Container2 */}
      {themes.length > 0 && 
  themes.map(theme =>(
    <>
  
    {/*console.log("Theme Mao", theme)*/}
    
      <ThemeCard theme={theme} key={theme.id} />
    </>
  
   
   ))}
      
       {/* <Padded top >
          <Button color="primary" label="Submit" type="submit" />
       </Padded> */}
     


     </ul>   
     </ThemeCardWrapper>

     <ThemePreviewWrapper>
       <h2>Preview the Theme</h2>
       <div style={{backgroundColor:theme.colors.headerFooterColor, color:theme.colors.headerFooterTxtColor, fontFamily:theme.colors.headerFooterFont, fontSize:`${theme.colors.headerFooterTxtSize}px`, minHeight:"30px"}}>
                        <span style={{paddingTop:"5px", paddingLeft:"10px",fontFamily: theme.colors.headerFooterFont}}>Header Footer Text</span>
                    </div>
                    <div style={{backgroundColor:theme.colors.menuBgColor, color: theme.colors.menuTextColor, fontFamily: theme.colors.menuFont, fontSize:`${theme.colors.headerFooterTxtColor}px`, minHeight:"30px", textAlign:"center"}}>
                        <span style={{lineHeight:"30px",fontFamily: theme.colors.menuFont}}>Home      Products   About Us</span>
                    </div>
       {/*<ThemeProvider theme={ theme }> */}
         {console.log("The Theme in the ThemeProvider", theme)}
         <Container style={{fontFamily: theme.font, backgroundColor: theme.colors.body, padding:'5px', border:'1px solid black'}}>
         <h1 style={{fontFamily:theme.font}}>{theme.name}</h1>
                    <p style={{fontFamily:theme.font, fontSize:`${theme.txtSize}px`}}>
                        {theme.description}
                    </p>
                    <h1 style={{fontFamily: theme.h1Font, fontSize: `${theme.h1Size}px`, color:theme.h1}} >h1 - Heading 1</h1>
         <h2 style={{fontFamily: theme.h2Font, fontSize: `${theme.h2Size}px`, color:theme.h2}} >h2 - Heading 2</h2>
         <h3 style={{fontFamily: theme.h3Font, fontSize: `${theme.h3Size}px`, color:theme.h3}} >h3 - Heading 3</h3>
         <h4 style={{fontFamily: theme.h4Font, fontSize: `${theme.h4Size}px`, color:theme.h4}} >h4 - Heading 4</h4>
         <h4 style={{fontFamily: theme.h5Font, fontSize: `${theme.h5Size}px`, color:theme.h5}} >h5 - Heading 5</h4>
         <h4 style={{fontFamily: theme.h6Font, fontSize: `${theme.h6Size}px`, color:theme.h6}} >h6 - Heading 6</h4>

          <p style={{fontFamily: theme.font, fontSize: `${theme.pSize}px`}}>
            This is the paragraph
            </p>
         
           
            <p> <a>A link.</a></p>
            <ThemedButton style={{backgroundColor: `${theme.colors.button.background}`, color: `${theme.colors.button.text}`, fontFamily: `${theme.font}`}} onClick={()=>setDefaultTheme(theme)}>Apply to Site</ThemedButton>
            <ThemedButton style={{backgroundColor: `${theme.colors.button.background}`, color: `${theme.colors.button.text}`, fontFamily: `${theme.font}`, paddingTop:"5px"}} onClick={()=>DeleteTheme()}>Delete Theme</ThemedButton>
          
           </Container>
      {/* </ThemeProvider> */}
     </ThemePreviewWrapper>
    
    </Block>
    </div>
  </Container>
</div>


  
  
  
  }
  </>
  
  )

}
</>
  )
}
export default memo(HomePage);
