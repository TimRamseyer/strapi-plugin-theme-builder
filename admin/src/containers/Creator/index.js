import React, { memo, useState, useEffect  } from 'react';
import { Container, Block } from "../../components/strapiStyled";
import WebFont from 'webfontloader';
import FontPicker from "font-picker-react";
import styled, { ThemeProvider } from "styled-components";
import pluginPkg from '../../../../package.json';
import {
    Enumeration,
  } from '@buffetjs/core';
  import {MdExpandMore, MdExpandLess} from 'react-icons/md'
import { InputText, Button, Padded } from "@buffetjs/core";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader
} from "strapi-helper-plugin";
import pluginId from '../../pluginId';

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const name = pluginPkg.strapi.name;
 
const Creator = () => {
    const [loading, setLoading] = useState(false)
    const [themeName, setThemeName] = useState('')
    const [bgColor, setBgColor] = useState('#F4F1F0')
    const [txtColor, setTxtColor] = useState( "#000000")
    const [txtSize, setTxtSize] = useState("16")
    const [btnHeight, setBtnHeight] = useState("32")
    const [btnTextSize, setButtonTextSize] = useState(txtSize)
    const [btnBgColor,setBtnColor] = useState("#000000")
    const [btnTxtColor, setBtnTxtColor] = useState("#FFFFFF")
    const [btnPadding, setBtnPadding] = useState("2")
    const [btnBorder, setBtnBorder] = useState("1")
    const [btnBorderColor, setBtnBorderColor] = useState("#000000")
    const [btnHoverColor, setBtnHoverColor] = useState(bgColor)
    const [btnHoverTxtColor, setBtnHoverTxtColor] = useState("#000000")
    const [btnHoverBorderColor, setBtnHoverBorderColor] = useState("#000000")
    const [secondaryBtnColor, setSecondaryBtnColor] = useState(bgColor)
    const [secondaryBtnTxtColor, setSecondaryBtnTxtColor] = useState("#000000")
    //const [secondaryBtnPadding, setSecondaryBtnPadding] = useState("2")
    //const [secondaryBtnBorder, setSecondaryBtnBorder] = useState("1")
    const [btnSecondaryBorderColor, setBtnSecondaryBorderColor] = useState("#000000")
    const [secondaryHoverBtnColor, setSecondaryHoverBtnColor] = useState("#000000")
    const [btnSecondaryHoverBorderColor, setBtnSecondaryHoverBorderColor] = useState("#000000")
    const [secondaryBtnHoverTxtColor, setSecondaryBtnHoverTxtColor] = useState("#ffffff")
    const [linkColor, setLinkColor] = useState("#0000FF")
    const [hoverLinkColor, setHoverLinkColor] = useState('#4682B4')
    const [linkDecoration, setLinkDecoration] = useState('none')
    const [font, setFont] = useState("Roboto")
    const [themeDesc ,setThemeDesc] = useState('')
    const [ menuFont,setMenuFont ] = useState("Roboto")
    const [ menuFootBg, setMenuFootBg ] = useState("#000000")
    const [menuFootText, setMenuFootText] = useState("#ffffff")
    const [menuFootSize, setMenuFootSize] = useState(txtSize)
    const [menuFootFont, setMenuFootFont] = useState(font)
    const [ menuColor, setMenuColor ] = useState("#ffffff")
    const [menuBgColor, setMenuBgColor] = useState("#0000FF")
    const [menuTextSize, setMenuTextSize] = useState(txtSize)
    
    
    const [h1Color,setH1Color ] = useState(txtColor)
    const [h1Size ,setH1Size ] = useState("32")
    const [h1Font ,setH1Font ] = useState(font)
    const [h2Color,setH2Color ] = useState(txtColor)
    const [h2Size ,setH2Size ] = useState("24")
    const [h2Font ,setH2Font ] = useState(font)
    const [h3Color,setH3Color ] = useState(txtColor)
    const [h3Size ,setH3Size ] = useState("18.72")
    const [h3Font ,setH3Font ] = useState(font)
    const [h4Color,setH4Color ] = useState(txtColor)
    const [h4Size ,setH4Size ] = useState("16")
    const [h4Font ,setH4Font ] = useState(font)
    const [h5Color,setH5Color ] = useState(txtColor)
    const [h5Size ,setH5Size ] = useState("13.28")
    const [h5Font ,setH5Font ] = useState(font)
    const [h6Color,setH6Color ] = useState(txtColor)
    const [h6Size ,setH6Size ] = useState("12")
    const [h6Font ,setH6Font ] = useState(font)
    const [btnFont, setBtnFont] = useState(font)
   /* const [ , ] = useState()
    const [ , ] = useState()
    const [ , ] = useState() */
const [fontToggle, setFontToggle] = useState(false)
const [headerToggle, setHeaderToggle] = useState(false)
const [menuToggle, setMenuToggle] = useState(false)
const [buttonToggle, setButtonToggle] = useState(false)
const [linkToggle, setLinkToggle] = useState(false)
const [themes, setThemes] = useState([])
const [themeId, setThemeId] = useState("0")


const handleUpdate = async()=>{
    if(!themeName || !themeDesc){
        
        strapi.notification.toggle({type:"warning" ,message:"You must enter a name and description for your theme",blockTransition:true})
    }
    else{
    setLoading(true)
    await fetch(`http://localhost:1337/themesData/${themeId}`, {
        method: 'PUT',
        body: JSON.stringify({name:themeName ,
            colors:{body:bgColor, text:txtColor, 
                button:{
                    text:btnTxtColor, 
                    background:btnBgColor,
                    hoverText: btnHoverTxtColor,
                    hoverBackground: btnHoverColor,
                    border: btnBorderColor,
                    size: btnTextSize,
                    font: btnFont,
                    secondaryText: secondaryBtnTxtColor,
                    secondaryborder: btnSecondaryBorderColor,
                    secondaryHoverText: secondaryBtnHoverTxtColor,
                    secondaryHoverBackground:secondaryHoverBtnColor ,
                    secondaryBgColor: secondaryBtnColor,
                    lineHeight: btnHeight,
                    borderThickness: btnBorder,
                    hoverBorderColor:btnHoverBorderColor, 
                    hoverSecondaryBorderColor:btnSecondaryHoverBorderColor,
                    padding: btnPadding,
                }, 
                link:{text:linkColor,
                hover: hoverLinkColor ,
                underline: linkDecoration,
            },
        headerFooterColor: menuFootBg,
        menuBgColor: menuBgColor,
        menuTextColor: menuColor ,
        headerFooterTxtColor:menuFootText , 
        headerFootFont: menuFootFont,
        menuFont: menuFont,
        headerFooterTxtSize: menuFootSize, //this in strapi
        menuTxtSize: menuTextSize,  //this in strapi
        },
    font:font,
    description: themeDesc,
    h1: h1Color,
    h1Font: h1Font,
    
    h2: h2Color,
    h2Font: h2Font,
    
    h3: h3Color,
    h3Font: h3Font,
    
    h4: h4Color,
    h4Font:h4Font,
    
    h5: h5Color,
    h5Font: h5Font,
    
    h6: h6Color,
    h6Font: h6Font,
    h1Size: h1Size,
    h2Size: h2Size,
    h3Size: h3Size,
    h4Size: h4Size,
    h5Size: h5Size,
    h6Size: h6Size,
    pSize: txtSize
    
    }),
        headers: {
            'Content-type': 'application/json',
            
        }
        
    }).then (function(response) {
        if(response.ok) {
            strapi.notification.toggle({type:"success", message:"Your theme has been updated"});
          console.log(response);
      }}).then(function(){
        setDefaultTheme
        //strapi.unlockApp()
        setLoading(false)
        
      })
    }
}
const handelClick = async()=>{
    //strapi.lockApp()
    if(!themeName || !themeDesc){
        
        strapi.notification.toggle({type:"warning" ,message:"You must enter a name and description for your theme",blockTransition:true})
    }
    else{
    setLoading(true)
    await fetch("http://localhost:1337/themesData", {
        method: 'POST',
        body: JSON.stringify({name:themeName ,
            colors:{body:bgColor, text:txtColor, 
                button:{
                    text:btnTxtColor, 
                    background:btnBgColor,
                    hoverText: btnHoverTxtColor,
                    hoverBackground: btnHoverColor,
                    border: btnBorderColor,
                    size: btnTextSize,
                    font: btnFont,
                    secondaryText: secondaryBtnTxtColor,
                    secondaryborder: btnSecondaryBorderColor,
                    secondaryHoverText: secondaryBtnHoverTxtColor,
                    secondaryHoverBackground:secondaryHoverBtnColor ,
                    secondaryBgColor: secondaryBtnColor,
                    lineHeight: btnHeight,
                    borderThickness: btnBorder,
                    hoverBorderColor:btnHoverBorderColor, 
                    hoverSecondaryBorderColor:btnSecondaryHoverBorderColor,
                    padding: btnPadding,
                }, 
                link:{text:linkColor,
                hover: hoverLinkColor ,
                underline: linkDecoration,
            },
        headerFooterColor: menuFootBg,
        menuBgColor: menuBgColor,
        menuTextColor: menuColor ,
        headerFooterTxtColor:menuFootText , 
        headerFootFont: menuFootFont,
        menuFont: menuFont,
        headerFooterTxtSize: menuFootSize, //this in strapi
        menuTxtSize: menuTextSize,  //this in strapi
        },
    font:font,
    description: themeDesc,
    h1: h1Color,
    h1Font: h1Font,
    
    h2: h2Color,
    h2Font: h2Font,
    
    h3: h3Color,
    h3Font: h3Font,
    
    h4: h4Color,
    h4Font:h4Font,
    
    h5: h5Color,
    h5Font: h5Font,
    
    h6: h6Color,
    h6Font: h6Font,
    h1Size: h1Size,
    h2Size: h2Size,
    h3Size: h3Size,
    h4Size: h4Size,
    h5Size: h5Size,
    h6Size: h6Size,
    pSize: txtSize
    
    }),
        headers: {
            'Content-type': 'application/json',
            
        }
        
    }).then (function(response) {
        if(response.ok) {
            strapi.notification.toggle({type:"success"});
          console.log(response);
      }}).then(function(){
        setDefaultTheme()
        //strapi.unlockApp()
        setLoading(false)
        
      })
    }
}

const handleThemeChange = (e)=>{
    if(e.target.value == 0){
        setDefaultTheme()
    } else {
    const currentfilter = themes.filter(obj => obj.id == e.target.value)
    const current = currentfilter[0]
     
    console.log("The current theme", current)
    setThemeId(current.id)
    setFont(current.font),
        setTxtColor( current.colors.text),
        setTxtSize(current.pSize),
        setThemeName(current.name),
        setThemeDesc(current.description),
        setBtnHeight(current.colors.button.lineHeight),
        setBgColor(current.colors.body),
        setBtnColor(current.colors.button.background),
        setBtnTxtColor(current.colors.button.text),
        setBtnBorderColor(current.colors.button.border),
        setBtnHoverColor(current.colors.button.hoverBackground),
        setBtnHoverTxtColor(current.colors.button.hoverText),
        setBtnHoverBorderColor(current.colors.button.hoverBorderColor),
        setButtonTextSize(current.colors.button.size),
        setBtnFont(current.colors.button.font),
        setBtnPadding(current.colors.button.padding),
        setBtnBorder(current.colors.button.borderThickness),
        setSecondaryBtnColor(current.colors.button.secondaryBgColor),
        setBtnSecondaryBorderColor(current.colors.button.secondaryborder),
        setSecondaryBtnTxtColor(current.colors.button.secondaryText),
        setSecondaryHoverBtnColor(current.colors.button.secondaryHoverBackground),
        setBtnSecondaryHoverBorderColor(current.colors.button.hoverSecondaryBorderColor),
        setSecondaryBtnHoverTxtColor(current.colors.button.secondaryHoverText),
        setLinkColor(current.colors.link.text),
        setH1Color(current.h1),
        setH1Size(current.h1Size),
        setH1Font(current.h1Font),
        setH2Color(current.h2),
        setH2Size(current.h2Size),
        setH2Font(current.h2Font),
        setH3Color(current.h3),
        setH3Size(current.h3Size),
        setH3Font(current.h3Font),
        setH4Color(current.h4),
        setH4Size(current.h4Size),
        setH4Font(current.h4Font),
        setH5Color(current.h5),
        setH5Size(current.h5Size),
        setH5Font(current.h5Font),
        setH6Color(current.h6),
        setH6Size(current.h6Size),
        setH6Font(current.h6Font),
        setMenuFootBg(current.colors.headerFooterColor),
        setMenuFootSize(current.colors.headerFooterTxtSize),
        setMenuFootText(current.colors.headerFooterTxtColor),
        setMenuFootFont(current.colors.headerFootFont),
        setMenuFont(current.colors.menuFont),
        setMenuColor(current.colors.menuTextColor),
        setMenuBgColor(current.colors.menuBgColor),
        setMenuTextSize(current.colors.menuTextSize),
        setHoverLinkColor(current.colors.link.hover),
        setLinkDecoration(current.colors.link.underline)
    }
}


useEffect(()=>{
    fetch("http://localhost:1337/themesData") // TODO take out http://localhost:1337 when finished running dev --admin 
    .then(response => response.json())
    .then(json => {console.log("Hopefully the returned json object",json)
  setThemes(json)
  //setFonts(json.font)
})},[])

const setDefaultTheme = () =>{
    setThemeId("0")
    setFont("Roboto")
        setTxtColor( "#000000")
        setTxtSize("16")
        setThemeName('')
        setThemeDesc('')
        setBtnHeight("36")
        setBgColor('#F4F1F0')
        setBtnColor("#000000")
        setBtnTxtColor("#FFFFFF")
        setBtnBorderColor("#000000")
        setBtnHoverColor('#F4F1F0')
        setBtnHoverTxtColor("#000000")
        setBtnHoverBorderColor("#000000")
        setButtonTextSize("16")
        setBtnFont("Roboto")
        setBtnPadding("2")
        setBtnBorder("1")
        setSecondaryBtnColor("#F4F1F0")
        setBtnSecondaryBorderColor("#000000")
        setSecondaryBtnTxtColor("#000000")
        setSecondaryHoverBtnColor("#000000")
        setBtnSecondaryHoverBorderColor("#000000")
        setSecondaryBtnHoverTxtColor("#ffffff")
        //setSecondaryBtnPadding("2")
        //setSecondaryBtnBorder("1")
        setLinkColor("#0000FF")
        setH1Color("#000000")
        setH1Size("32")
        setH1Font("Roboto")
        setH2Color("#000000")
        setH2Size("24")
        setH2Font("Roboto")
        setH3Color("#000000")
        setH3Size("18.72")
        setH3Font("Roboto")
        setH4Color("#000000")
        setH4Size("16")
        setH4Font("Roboto")
        setH5Color("#000000")
        setH5Size("13.28")
        setH5Font("Roboto")
        setH6Color("#000000")
        setH6Size("12")
        setH6Font("Roboto")
        setMenuFootBg("#000000")
        setMenuFootSize("16")
        setMenuFootText("#ffffff")
        setMenuFootFont("Roboto")
        setMenuFont("Roboto")
        setMenuColor("#ffffff")
        setMenuBgColor("#0000FF")
        setMenuTextSize("16")
        setHoverLinkColor('#4682B4')
        setLinkDecoration('none')
}

    return(
        <>
         {loading?(
    <LoadingIndicator style={{width:"120px", height:"120px"}}/>
  ):(
  <>
  
     
  <div className="col-md-12">
  <Container>
  <PluginHeader
  
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
      },
    ]}
    style={{ marginTop: "4.4rem" }}
  />
  <div className="row">
    <Block title="Theme Creator">
        <div style={{display:"flex"}}>
      <h1>Create a  theme</h1>
      <span style={{marginLeft:"auto", marginRight:"auto", fontSize:"22px"}}>
          {console.log("The Themes", themes)}
      <select style={{border:"1px solid black"}} onChange={ handleThemeChange }>
          <option value="0">New Theme</option>
          {themes && themes.map((theme)=>{
             return(
<option key={theme.id} value={theme.id} >{theme.name}</option>)
          })}
      </select>
      </span>
      </div>
      <BuilderContainer>
      <Section>
          <Row><h3>Main Theme Styles:</h3></Row>
                <Row>
                    <label htmlFor="th_name">Theme Name:</label> {' '}
                    <input 
                        type="text" 
                        id="themeName" 
                        name="themeName" 
                        value={themeName}
                        placeholder="Specify a name" 
                        onChange={(e)=> setThemeName(e.target.value) }/>
                </Row>
                <Row>
                <label htmlFor="th_desc">Theme Description:</label> {' '}
                    <input 
                        type="text" 
                        id="themeDesc" 
                        name="themeDesc" 
                        value={themeDesc}
                        placeholder="Provide a description for your Theme" 
                        onChange={(e)=> setThemeDesc(e.target.value) }/> 
                </Row>
                <Row>
                    <label htmlFor="font">Select a Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={font}
                    onChange={(nextFont) =>
                        setFont(
                            nextFont.family,
                        )
                    }
                   
                />
                   
                </Row>







                <Row>
                    <label htmlFor="bg_color">Background Color:</label> {' '}
                    <input type="color" id="bg_color" name="bgColor" value= { bgColor } onChange={ (e)=>setBgColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="txt_color">Text Color:</label> {' '}
                    <input type="color" id="txt_color" name="txtColor" value={ txtColor } onChange={ (e)=>setTxtColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="txt_size">Text Size:</label> {' '}
                    <input type="number" id="txt_size" name="txtSize" value={ txtSize } onChange={ (e)=>setTxtSize(e.target.value) }/>
                </Row>
                <Row style={{display:"flex", backgroundColor:"lightgrey", marginBottom:"5px"}}>
                    <h3>Heading Styles</h3>
                    {fontToggle?(<MdExpandLess size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setFontToggle(false)} />
                    ):(
                        <MdExpandMore size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setFontToggle(true)} />
                    )}
                    
                   
                 
                </Row>
                {fontToggle &&
                <>
                <div style={{paddingLeft:"5px"}}>
                <Row>
                <h4>Heading 1 styles</h4>
                    <label htmlFor="h1_color">h1 Color:</label> {' '}
                    <input type="color" id="h1_color" name="h1Color" value={ h1Color } onChange={ (e)=>setH1Color(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="h1_size">h1 Size:</label> {' '}
                    <input type="number" id="h1_size" name="h1Size" value={ h1Size } onChange={ (e)=>setH1Size(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="h1Font">h1 Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={h1Font}
                    onChange={(nextFont) =>
                        setH1Font(
                            nextFont.family,
                        )
                    }/>
                   </Row>
                   <hr />
                   <Row>
                   <h4>Heading 2 styles</h4>
                    <label htmlFor="h2_color">h2 Color:</label> {' '}
                    <input type="color" id="h2_color" name="h2Color" value={ h2Color } onChange={ (e)=>setH2Color(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="h2_size">h2 Size:</label> {' '}
                    <input type="number" id="h2_number" name="h2Number" value={ h2Size } onChange={ (e)=>setH2Size(e.target.value) }/>
                </Row>
              
                
                <Row>
                    <label htmlFor="h2Font">h2 Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={h2Font}
                    onChange={(nextFont) =>
                        setH2Font(
                            nextFont.family,
                        )
                    }/>
                   </Row>

<hr />
                   <Row>
                   <h4>Heading 3 styles</h4>
                    <label htmlFor="h3_color">h3 Color:</label> {' '}
                    <input type="color" id="h3_color" name="h3Color" value={ h3Color } onChange={ (e)=>setH3Color(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="h3_size">h3 Size:</label> {' '}
                    <input type="number" id="h3_size" name="h3Size" value={ h3Size } onChange={ (e)=>setH3Size(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="h3Font">h3 Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={h3Font}
                    onChange={(nextFont) =>
                        setH3Font(
                            nextFont.family,
                        )
                    }/>
                   </Row>
<hr />
                   <Row>
                   <h4>Heading 4 styles</h4>
                    <label htmlFor="h4_color">h4 Color:</label> {' '}
                    <input type="color" id="h4_color" name="h4Color" value={ h4Color } onChange={ (e)=>setH4Color(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="h4_size">h4 Size:</label> {' '}
                    <input type="number" id="h4_size" name="h4Size" value={ h4Size } onChange={ (e)=>setH4Size(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="h4Font">h4 Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={h4Font}
                    onChange={(nextFont) =>
                        setH4Font(
                            nextFont.family,
                        )
                    }/>
                   </Row>
<hr />
                   <Row>
                   <h4>Heading 5 styles</h4>
                    <label htmlFor="h5_color">h5 Color:</label> {' '}
                    <input type="color" id="h5_color" name="h5Color" value={ h5Color } onChange={ (e)=>setH5Color(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="h5_size">h5 Size:</label> {' '}
                    <input type="number" id="h5_number" name="h5Size" value={ h5Size } onChange={ (e)=>setH5Size(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="h5Font">h5 Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={h5Font}
                    onChange={(nextFont) =>
                        setH5Font(
                            nextFont.family,
                        )
                    }/>
                   </Row>
<hr />
                   <Row>
                       <h4>Heading 6 styles</h4>
                    <label htmlFor="h6_color">h6 Color:</label> {' '}
                    <input type="color" id="h6_color" name="h6Color" value={ h6Color } onChange={ (e)=>setH6Color(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="txt_color">h6 Size:</label> {' '}
                    <input type="number" id="h6_size" name="h6Size" value={ h6Size } onChange={ (e)=>setH6Size(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="h6Font">h6 Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={h6Font}
                    onChange={(nextFont) =>
                        setH6Font(
                            nextFont.family,
                        )
                    }/>
                   </Row>
<hr />
                  </div> 

                </>}
                <Row style={{display:"flex", backgroundColor:"lightgrey", marginBottom:"5px"}}>
                    <h3>Header &amp; Footer Styles</h3>
                    {headerToggle?(<MdExpandLess size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setHeaderToggle(false)} />
                    ):(
                        <MdExpandMore size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setHeaderToggle(true)} />
                    )}
                </Row>
                {headerToggle && 
                <>
                <div style={{paddingLeft:"5px"}}>
                <Row>
                <label htmlFor="header_bgColor">Background Color:</label> {' '}
                    <input type="color" id="header_bgColor" name="headerBackgroundColor" value={ menuFootBg } onChange={ (e)=>setMenuFootBg(e.target.value) }/>
                </Row>
                <Row>
                <label htmlFor="header_color">Text Color:</label> {' '}
                    <input type="color" id="header_color" name="headerColor" value={ menuFootText } onChange={ (e)=>setMenuFootText(e.target.value) }/>
                </Row>
                <Row>
                <label htmlFor="header_size">Text size:</label> {' '}
                    <input type="number" id="header_size" name="headerTextSize" value={ menuFootSize } onChange={ (e)=>setMenuFootSize(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="headerFont">Header Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={menuFootFont}
                    onChange={(nextFont) =>
                        setMenuFootFont(
                            nextFont.family,
                        )
                    }/>
                   </Row>
                   </div>
                </>}
                <Row style={{display:"flex", backgroundColor:"lightgrey", marginBottom:"5px"}}>
                    <h3>Menu Styles</h3>
                    {menuToggle?(<MdExpandLess size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setMenuToggle(false)} />
                    ):(
                        <MdExpandMore size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setMenuToggle(true)} />
                    )}
                </Row>
                {menuToggle &&
                <>
                <div style={{paddingLeft:"5px"}}>
                <Row>
                <label htmlFor="menu_bgColor">Background Color:</label> {' '}
                    <input type="color" id="menu_bgColor" name="menuBackgroundColor" value={ menuBgColor } onChange={ (e)=>setMenuBgColor(e.target.value) }/>
                </Row>
                <Row>
                <label htmlFor="menu_color">Text Color:</label> {' '}
                    <input type="color" id="menu_color" name="menuColor" value={ menuColor } onChange={ (e)=>setMenuColor(e.target.value) }/>
                </Row>
                <Row>
                <label htmlFor="menu_size">Text size:</label> {' '}
                    <input type="number" id="menu_size" name="menuTextSize" value={ menuTextSize } onChange={ (e)=>setMenuTextSize(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="MenuFont">Header Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={menuFont}
                    onChange={(nextFont) =>
                        setMenuFont(
                            nextFont.family,
                        )
                    }/>
                </Row>
                </div>
                </>
                }
                <Row style={{display:"flex", backgroundColor:"lightgrey", marginBottom:"5px"}}>
                    <h3>Button Styles</h3>
                    {buttonToggle?(<MdExpandLess size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setButtonToggle(false)} />
                    ):(
                        <MdExpandMore size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setButtonToggle(true)} />
                    )}
                </Row>
                {buttonToggle &&
                <>
                <div style={{paddingLeft:"5px"}}>
                <Row>
                    <label htmlFor="btn_bg_color">Button Background Color:</label> {' '}
                    <input type="color" id="btn_bg_color" name="btnBgColor" value={ btnBgColor } onChange={ (e)=>setBtnColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="btn_txt_color">Button Text Color:</label> {' '}
                    <input type="color" id="btn_txt_color" name="btnTxtColor" value={ btnTxtColor } onChange={ (e)=>setBtnTxtColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="btn_border">Button Border Color :</label> {' '}
                    <input type="color" id="btn_border" name="btnBorderColor" value={ btnBorderColor } onChange={ (e)=>setBtnBorderColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="btn_bg_color">Button Background Hover Color:</label> {' '}
                    <input type="color" id="btn_bg_color" name="btnBgColor" value={ btnHoverColor } onChange={ (e)=>setBtnHoverColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="btn_txt_color">Button Text Hover Color:</label> {' '}
                    <input type="color" id="btn_txt_color" name="btnTxtColor" value={ btnHoverTxtColor } onChange={ (e)=>setBtnHoverTxtColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="btn_border">Button Border Hover Color :</label> {' '}
                    <input type="color" id="btn_border" name="btnBorderColor" value={ btnHoverBorderColor } onChange={ (e)=>setBtnHoverBorderColor(e.target.value) }/>
                </Row>
                <h4>Secondary Button Styles</h4>
                <Row>
                    <label htmlFor="secondary_btn_bg_color">Secondary Button Background Color:</label> {' '}
                    <input type="color" id="secondary_btn_bg_color" name="secondaryBtnBgColor" value={ secondaryBtnColor } onChange={ (e)=>setSecondaryBtnColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="secondary_btn_txt_color">Secondary Button Text Color:</label> {' '}
                    <input type="color" id="secondary_btn_txt_color" name="secondaryBtnTxtColor" value={ secondaryBtnTxtColor } onChange={ (e)=>setSecondaryBtnTxtColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="secondaty_btn_border">Secondary Button Border Color :</label> {' '}
                    <input type="color" id="secondary_btn_border" name="secondaryBtnBorderColor" value={ btnSecondaryBorderColor } onChange={ (e)=>setBtnSecondaryBorderColor(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="secondary_btn_bg_color">Secondary Button Hover Background Color:</label> {' '}
                    <input type="color" id="secondary_btn_bg_color" name="secondaryBtnBgColor" value={ secondaryHoverBtnColor } onChange={ (e)=>setSecondaryHoverBtnColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="secondary_btn_txt_color">Secondary Button Hover Text Color:</label> {' '}
                    <input type="color" id="secondary_btn_txt_color" name="secondaryBtnTxtColor" value={ secondaryBtnHoverTxtColor } onChange={ (e)=>setSecondaryBtnHoverTxtColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="secondaty_btn_border">Secondary Button Hover Border Color :</label> {' '}
                    <input type="color" id="secondary_btn_border" name="secondaryBtnBorderColor" value={ btnSecondaryHoverBorderColor } onChange={ (e)=>setBtnSecondaryHoverBorderColor(e.target.value) }/>
                </Row>
                <h4>General Styles</h4>
                <Row>
                <Row>
                    <label htmlFor="ButtonFont">Button Font:</label> {' '}
                    <FontPicker
                    apiKey="AIzaSyCCDdsOYXm0bHTqu4lJHxuvNCyeKXo-PKY"
                    limit="300"
                    activeFontFamily={btnFont}
                    onChange={(nextFont) =>
                        setBtnFont(
                            nextFont.family,
                        )
                    }/>
                </Row>
                <label htmlFor="Btn_Text_size">Button Text Size:</label> {' '}
                    <input type="number" id="Btn_Text_size" name="buttonTextSize" value={ btnTextSize } onChange={ (e)=>setButtonTextSize(e.target.value) }/>
                </Row>
               
                
                <Row>
                <label htmlFor="border_width">Button Border Width:</label> {' '}
                    <input type="number" id="border_width" name="borderWidth" value={ btnBorder } onChange={ (e)=>setBtnBorder(e.target.value) }/>
                </Row>
                
                <Row>
                    <label htmlFor="btn_height">Button Height:</label> {' '}
                    <input type="number" id="btn_height" name="btnHeight" value={ btnHeight} onChange={ (e)=>setBtnHeight(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="btn_padding">Button Padding:</label> {' '}
                    <input type="number" id="btn_padding" name="btnPadding" value={ btnPadding} onChange={ (e)=>setBtnPadding(e.target.value) }/>
                </Row>
                </div>
                </>
                }
                <Row style={{display:"flex", backgroundColor:"lightgrey", marginBottom:"5px"}}>
                    <h3>Link Styles</h3>
                    {linkToggle?(<MdExpandLess size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setLinkToggle(false)} />
                    ):(
                        <MdExpandMore size={24} style={{marginLeft:"auto", marginRight:"5px"}} onClick={()=>setLinkToggle(true)} />
                    )}
                </Row>
                {linkToggle &&
                <>
                <div style={{paddingLeft:"5px"}}>
                <Row>
                    <label htmlFor="link_color">Link Color:</label> {' '}
                    <input type="color" id="link_color" name="linkColor" value={ linkColor } onChange={ (e)=>setLinkColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="link_hover_color">Link Hover Color:</label> {' '}
                    <input type="color" id="link_hover_color" name="linkHoverColor" value={ hoverLinkColor } onChange={ (e)=>setHoverLinkColor(e.target.value) }/>
                </Row>
                <Row>
                    <label htmlFor="link_decoration">Link Text Underline:</label> {' '}
                    <select id="link_decoration" name="linkDecoration" value={ linkDecoration } onChange={ (e)=>setLinkDecoration(e.target.value) }>
                    <option value="none">none</option>
                    <option value="underline">underline</option>
                        </select>
                </Row>
                </div>
                </>}
                

                
            </Section>

            <Section style={{borderRadius: "4px"}}>
                <span><b>Preview:</b></span>
                <HeadFoot backgroundColor={menuFootBg} color={menuFootText} fontFamily={menuFootFont} fontSize={`${menuFootSize}px`} style={{ minHeight:"30px"}}>
                        <span style={{paddingTop:"5px", paddingLeft:"10px",fontFamily: menuFootFont}}>Header Footer Text</span>
                    </HeadFoot>
                    <div style={{backgroundColor:menuBgColor, color: menuColor, fontFamily: menuFont, fontSize:`${menuTextSize}px`, minHeight:"30px", textAlign:"center"}}>
                        <span style={{lineHeight:"30px",fontFamily: menuFont}}>Home      Products   About Us</span>
                    </div>

                <Preview style={{backgroundColor: bgColor, color: txtColor, fontFamily: font, paddingLeft:"10px"}}>
                    
                    
                    <h1 style={{fontFamily:font}}>{themeName}</h1>
                    <p style={{fontFamily:font, fontSize:`${txtSize}px`}}>
                        {themeDesc}
                    </p>
                    
         <h1 style={{fontFamily: h1Font, fontSize: `${h1Size}px`, color:h1Color}} >h1 - Heading 1</h1>
         <h2 style={{fontFamily: h2Font, fontSize: `${h2Size}px`, color:h2Color}} >h2 - Heading 2</h2>
         <h3 style={{fontFamily: h3Font, fontSize: `${h3Size}px`, color:h3Color}} >h3 - Heading 3</h3>
         <h4 style={{fontFamily: h4Font, fontSize: `${h4Size}px`, color:h4Color}} >h4 - Heading 4</h4>
         <h4 style={{fontFamily: h5Font, fontSize: `${h5Size}px`, color:h5Color}} >h5 - Heading 5</h4>
         <h4 style={{fontFamily: h6Font, fontSize: `${h6Size}px`, color:h6Color}} >h6 - Heading 6</h4>

          <p style={{fontFamily: font, fontSize: `${txtSize}px`}}>
            This is the paragraph
            </p>
           <div>
                    <PrimaryButton backgroundColor={btnBgColor} color={btnTxtColor} fontFamily={btnFont} fontSize ={`${btnTextSize}px`} border={`${btnBorder}px solid ${btnBorderColor}`} lineHeight={`${btnHeight}px`} hover={btnHoverColor} hoverText={btnHoverTxtColor} hoverBorder={`${btnBorder}px solid ${btnHoverBorderColor}`}>
                       <span style={{paddingLeft:`${btnPadding}px`, paddingRight:`${btnPadding}px`, fontFamily: btnFont}}>Primary Button</span> 
                    </PrimaryButton> {'  '}
                    <SecondaryButton backgroundColor={secondaryBtnColor} color= {secondaryBtnTxtColor} fontFamily= {btnFont} fontSize= {`${btnTextSize}px`} border= {`${btnBorder}px solid ${btnSecondaryBorderColor}`} lineHeight={`${btnHeight}px`} hover={secondaryHoverBtnColor} hoverText={secondaryBtnHoverTxtColor} hoverBorder={`${btnBorder}px solid ${btnSecondaryHoverBorderColor}`}>
                        <span style={{paddingLeft: `${btnPadding}px`, paddingRight:`${btnPadding}px`, fontFamily: btnFont}}>Secondary Button</span>
                    </SecondaryButton> {'  '}
                    </div>
                    <A href="#" color={linkColor} textDecoration={linkDecoration} hover={hoverLinkColor} fontFamily={font}>I am Link</A>
                 
                    
                </Preview>
                <HeadFoot backgroundColor={menuFootBg} color={menuFootText} fontFamily={menuFootFont} fontSize={`${menuFootSize}px`} style={{minHeight:"60px", paddingTop:"10px"}}>
                        <span style={{fontFamily: menuFootFont, paddingLeft:"10px"}}>Header Footer Text</span>
                    </HeadFoot>
                    <div style={{display:"flex", float:"right"}}>
                <Button style={{ marginTop:"5px"}}onClick={()=>handelClick()}>Save New</Button>
                {themeId !="0" &&
                 <Button style={{ marginTop:"5px", marginLeft:"2px"}}onClick={()=>handleUpdate()}>Update</Button>
                }
               
                </div>
            </Section>
            </BuilderContainer>
            
       {/* <Padded top >
          <Button color="primary" label="Submit" type="submit" />
       </Padded> */}
     


        
   
    </Block>
    </div>
  </Container>
</div>
  
</>
    )
}</>
    )};

    const HeadFoot = styled.div`
    background: ${props => props.backgroundColor};
    color: ${props=>props.color};
    font-family: ${props=>props.fontFamily};
    font-size: ${props=>props.fontSize};
    line-height: 40px;

    `
    const A = styled.a`
color: ${props => props.color};
text-decoration: ${props => props.textDecoration} !important;
font-family: ${props => props.fontFamily} ;
:hover{
    color:${props=>props.hover};
};
    `
    const PrimaryButton = styled.button`
background-color: ${props=>props.backgroundColor};
color: ${props=>props.color};
font-family: ${props=>props.fontFamily};
font-size: ${props=>props.fontSize};
border: ${props=>props.border};
line-height ${props=>props.lineHeight};
:hover{
    color:${props=>props.hoverText};
    background-color: ${props=>props.hover};
    border: ${props=>props.hoverBorder};
}
    `

    const SecondaryButton = styled.button`
    background-color: ${props=>props.backgroundColor};
    color: ${props=>props.color};
    font-family: ${props=>props.fontFamily};
    font-size: ${props=>props.fontSize};
    border: ${props=>props.border};
    line-height ${props=>props.lineHeight};
    :hover{
        color:${props=>props.hoverText};
        background-color: ${props=>props.hover};
        border: ${props=>props.hoverBorder};
    }
        `

const BuilderContainer = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 3rem;
    input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  opacity: 1;
}


input[type=number]{
    border: 1px solid;
    max-width: 70px;
    text-align: center;
}
input[type=text]{
    border: 1px solid;
}
`;

const Section = styled.div`
    vertical-align: top;
    margin-right: 10px;
    padding: 10px;
`;

const Row = styled.div`
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    
`;
const ThemedButton = styled.button`
backgroung-color: ${props => props.btnBgColor}
:hover {
    background: black;
}`;

const Preview = styled.div`
    border: 1px solid #000000;
    width: 100%;
    min-height: 200px;
    padding: 5px;
`;

export default memo(Creator);