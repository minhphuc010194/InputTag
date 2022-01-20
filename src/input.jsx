import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Tag, TagCloseButton } from "@chakra-ui/react";
import styles from "./Input.module.css";
const dataTemp = ["hello1", "hello2"];
export default function InputTag() {
  const [dataInput, setDataIput] = useState(() => [...dataTemp]);
  const [sizeInput, setSizeInput] = useState(() => 1);
  const ref_input = useRef(null);

  useEffect(() => {
    function handleKeyUp(event) {
      const newText = ref_input.current.value.trim().replace(",", "");
      switch (event.key) {
        case ",":
          if (newText.length > 0) {
            const dataInputTemp = [...dataInput];
            dataInputTemp.push(newText);
            setDataIput(() => [...dataInputTemp]);
            ref_input.current.value = "";
          } else {
            ref_input.current.value = "";
          }
          break;
        case "Enter":
          if (newText.length > 0) {
            const dataInputTemp = [...dataInput];
            dataInputTemp.push(newText);
            setDataIput(() => [...dataInputTemp]);
            ref_input.current.value = "";
          }
          break;
        case "Backspace":
          if (dataInput.length > 0 && newText.length === 0) {
            const dataInputTemp = [...dataInput];
            dataInputTemp.pop();
            setDataIput([...dataInputTemp]);
          }
          break;
        default:
          break;
      }
    }
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [sizeInput, dataInput]);

  const handleChangeInput = (e) => {
    let value = e.target.value;
    if (value.trim().length > 0) {
      setSizeInput(value.length);
    } else {
      ref_input.current.value = "";
    }
  };
  function handleDelItem(index) {
    const dataInputTemp = [...dataInput];
    dataInputTemp.splice(index, 1);
    setDataIput(() => [...dataInputTemp]);
  }
  return (
    <div className={styles.wrap}>
      <Flex align onClick={() => ref_input.current.focus()}>
        <Box>
          {dataInput.map((text, i) => (
            <Tag
              key={i + "_" + text}
              colorScheme="cyan"
              className={styles.item_text}
            >
              {text}
              <TagCloseButton onClick={() => handleDelItem(i)} />
            </Tag>
          ))}
          <input
            ref={ref_input}
            onChange={handleChangeInput}
            className={styles.input}
            size={sizeInput}
          />
        </Box>
      </Flex>
    </div>
  );
}
