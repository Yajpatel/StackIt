import { SimpleEditor } from "../../../@/components/tiptap-templates/simple/simple-editor";
import React, { useState } from "react";

export default function Editor({content = ""}) {
  const [editor, setEditor] = useState(null);

  const handleGetHTML = () => {
    if (editor) {
      const html = editor.getHTML();
      alert(html);
    }
  };

  return (
    <div>
      <button onClick={handleGetHTML} disabled={!editor}>
        Get HTML
      </button>
      <SimpleEditor onEditorReady={setEditor} content={content} />
    </div>
  );
}
