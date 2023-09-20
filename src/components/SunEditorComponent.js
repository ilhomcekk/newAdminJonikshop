import React, { useEffect, useState } from 'react'
import SunEditor from 'suneditor-react'
import PropTypes from 'prop-types'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File

const SunEditorComponent = ({ onChangeValue, name, defaultValue }) => {
  const [params, setParams] = useState({
    value: defaultValue || '',
    name: name,
  })
  const handleValue = (e) => {
    let newParams = {
      ...params,
      value: e,
    }
    setParams(newParams)
    onChangeValue(newParams)
  }

  useEffect(() => {
    if (defaultValue) {
      let newParams = {
        ...params,
        value: defaultValue,
      }
      setParams(newParams)
    }
  }, [defaultValue])

  return (
    <div>
      <SunEditor
        lang={'ru'}
        setContents={params.value}
        onChange={handleValue}
        name={name}
        setDefaultStyle="font-family: arial; font-size: 16px;"
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize'],
            // ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor'],
            ['align', 'list', 'lineHeight'],
            ['outdent', 'indent'],

            ['table', 'horizontalRule', 'link'],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            // ["fullScreen", "showBlocks", "codeView"],
            ['preview', 'print'],
            ['removeFormat'],

            // ['save', 'template'],
            // '/', Line break
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          defaultTag: 'div',
          minHeight: '300px',
          showPathLabel: false,
        }}
      />
    </div>
  )
}

export default SunEditorComponent

SunEditorComponent.propTypes = {
  onChangeValue: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
}
