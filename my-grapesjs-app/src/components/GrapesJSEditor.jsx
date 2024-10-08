import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs-blocks-basic';
import 'grapesjs/dist/css/grapes.min.css';
import '../styles/customBlocks.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const GrapeJSEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100%',
      width: 'auto',
      storageManager: {
        type: 'local', 
        autosave: true,
        autoload: true, 
        stepsBeforeSave: 1,
      },
      plugins: ['gjs-blocks-basic'],
      pluginsOpts: {
        'gjs-blocks-basic': {},
      },
    });

    editor.on('component:add', (model) => {
      console.log('Component added:', model);
    });
  
    editor.on('component:remove', (model) => {
      console.log('Component removed:', model);
    });

    editorRef.current = editor;
    const savedData = localStorage.getItem('grapesjs-project');
    if (savedData) {
      const { html, css } = JSON.parse(savedData);
      editor.setComponents(html);
      editor.setStyle(css);
    }
    
    editor.BlockManager.add('input-block', {
        label: 'Input Field',
        content: `<form>
                    <div class="form-group">
                      <label for="input1">Input Label:</label>
                      <input type="text" id="input1" class="form-control"/>
                    </div>
                  </form>`,
      });

    editor.on('storage:store', (e) => {
      const html = editor.getHtml();
      const css = editor.getCss();
      localStorage.setItem('grapesjs-project', JSON.stringify({ html, css }));
    });

    editor.BlockManager.add('text', {
      label: 'Text',
      content: '<div>Insert your text here</div>',
    });

    editor.BlockManager.add('video', {
      label: 'Video',
      content: '<video controls><source src="path_to_video.mp4" type="video/mp4"></video>',
    });
    
    editor.BlockManager.add('one-column', {
      label: '1 Column',
      content: '<div class="row"><div class="col">1 Column</div></div>',
    });

    editor.BlockManager.add('two-columns', {
      label: '2 Columns',
      content: '<div class="row"><div class="col">Column 1</div><div class="col">Column 2</div></div>',
    });

    editor.BlockManager.add('three-columns', {
      label: '3 Columns',
      content: '<div class="row"><div class="col">Column 1</div><div class="col">Column 2</div><div class="col">Column 3</div></div>',
    });

    editor.BlockManager.add('two-columns-3-7', {
      label: '2 Columns 3/7',
      content: '<div class="row"><div class="col-3">Column 1</div><div class="col-7">Column 2</div></div>',
    });

    editor.BlockManager.add('link', {
      label: 'Link',
      content: '<a href="#">Insert your link here</a>',
    });

    editor.BlockManager.add('map', {
      label: 'Map',
      content: '<div style="height: 400px;"><iframe width="100%" height="100%" src="https://maps.google.com/maps?q=New York&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" style="border:0" allowfullscreen></iframe></div>',
    });

    editor.BlockManager.add('link-blog', {
      label: 'Link Blog',
      content: '<a href="https://yourblog.com">Visit our Blog</a>',
    });

    editor.BlockManager.add('quote', {
      label: 'Quote',
      content: '<blockquote>Insert your quote here</blockquote>',
    });

    editor.BlockManager.add('text-selector', {
      label: 'Text Selector',
      content: '<div class="text-selector"><h1>Heading 1</h1><h2>Heading 2</h2><p>Paragraph</p></div>',
    });

    editor.BlockManager.add('select', {
      label: 'Select',
      content: '<select><option value="">Select an option</option><option value="1">Option 1</option><option value="2">Option 2</option></select>',
    });

    editor.BlockManager.add('button', {
      label: 'Button',
      content: '<button>Click Me</button>',
    });

    editor.BlockManager.add('label', {
      label: 'Label',
      content: '<label for="input">Label Text</label>',
    });

    editor.BlockManager.add('checkbox', {
      label: 'Checkbox',
      content: '<label><input type="checkbox"> Check me</label>',
    });

    editor.BlockManager.add('radio', {
      label: 'Radio Button',
      content: '<label><input type="radio" name="group"> Option 1</label><label><input type="radio" name="group"> Option 2</label>',
    });

    editor.BlockManager.add('image', {
      label: 'Image',
      content: '<img src="path_to_image.jpg" alt="Image" style="max-width: 100%; height: auto;">',
    });
    editor.BlockManager.add('one-row', {
      label: 'One Row',
      content: '<div class="row"><div class="col">One Row</div></div>',
    });

    editor.BlockManager.add('two-rows', {
      label: 'Two Rows',
      content: `<div class="row">
                  <div class="col">Row 1</div>
                </div>
                <div class="row">
                  <div class="col">Row 2</div>
                </div>`,
      // category: 'Layout',
    });

    editor.BlockManager.add('three-rows', {
      label: 'Three Rows',
      content: `<div class="row">
                  <div class="col">Row 1</div>
                </div>
                <div class="row">
                  <div class="col">Row 2</div>
                </div>
                <div class="row">
                  <div class="col">Row 3</div>
                </div>`,
      // category: 'Layout',
    });


  }, []);

  const handleDownload = () => {
    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();

    const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Page</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      ${html}
    </body>
    </html>`;

    const zip = new JSZip();
    zip.file('index.html', fullHtml);
    zip.file('styles.css', css);

    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'website.zip');
      });
  };
  const handleClear = () => {
    const editor = editorRef.current;
    editor.setComponents('');
    editor.setStyle('');
    localStorage.removeItem('grapesjs-project');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleDownload}>Download as ZIP</button>
        <button onClick={handleClear} style={{ marginLeft: '10px' }}>Clear Data</button>
      </div>
      <div id="gjs" style={{ flexGrow: 1, border: '1px solid #ccc', overflow: 'auto' }}></div>
    </div>
  );
};

export default GrapeJSEditor;
