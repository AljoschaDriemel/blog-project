import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { Editor } from '@tinymce/tinymce-react';

const Input = styled("input")({
  display: "none",
});

export default function Modal({
  save,
  close,
  valueText,
  onTextChange,
  onChangeFile,
  valueImage,
  data,
  setData,
  editorRef
}) {
  
  const handleEditorChange = () => {
    setData({...data, text:editorRef.current.getContent()})
  }
  return (
    <Box
      style={{
        position: "fixed",
        padding: "10px",
        backgroundColor: "whitesmoke",
        borderRadius: "5px",
        border: "3px solid grey",
        width: "60%",
        height: "700px",
        top: "200px",
        left: "450px",
        display: "grid",
        placeContent: "center",
      }}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        {" "}
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          <Input
            value={valueImage}
            onChange={onChangeFile}
            type="file"
            name="image"
            id="file"
            accept="image/*"
          />
          <label>Title: </label>
          <input placeholder="Type the title" onChange={e=>setData({...data, title: e.target.value})} value={data.title}></input>
          <label>Subtitle: </label>
          <input placeholder="Type the subtitle" onChange={e=>setData({...data, subtitle: e.target.value})} value={data.subtitle}></input>
          <label>Category: </label>
          <input placeholder="Type the category" onChange={e=>setData({...data, category: e.target.value})} value={data.category}></input>
          <Button
            variant="contained"
            component="span"
            style={{ margin: "5px", marginLeft:"440px"  }}
          >
            Upload <PhotoCameraIcon />
          </Button>
        </label>
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={handleEditorChange}
          style={{ width: "95%" }}
          required
          id="outlined-required"
          label="Description"
          value={valueText}
          onChange={onTextChange}
        />
      </Stack>

      <div>
        {" "}
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={close}
          style={{ width: "50%" }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          onClick={save}
          endIcon={<SendIcon />}
          style={{ width: "50%" }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
}