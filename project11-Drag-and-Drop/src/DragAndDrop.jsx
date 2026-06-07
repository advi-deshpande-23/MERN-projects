import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const DragAndDrop = ({data: initialData}) => {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("drag-item");
        if(savedData) {
            return JSON.parse(savedData);
        }else{
            return initialData;
        }
    });

    useEffect(() => {
        localStorage.setItem("drag-item", JSON.stringify(data));
    }, [data])

    const mainheadings = Object.keys(data);  // ["Office_Task", "Home_Task", "Sunday_Task"]

    const dragItem = useRef();   // this will store all the information of item which is dragged
    const dragOverItem = useRef(); // this will show all the information of the destination item

    const handleDragStart = (e,  heading, taskObj, idx) => {
            let dragElement = e.target;
            dragElement.style.opacity = 0.5;
            dragItem.current = {
                idx,
                heading,
                taskObj
            }
    }

    const handleDragEnd = (e) => {
        let dragElement = e.target;
        dragElement.style.opacity = 1;
    }

    const handleDragEnter =  (e, idx, heading) => {
        dragOverItem.current = {
            idx,
            heading,
        };
    }

    const handleDrop = (e) => {
        const sourceData = dragItem.current;
        const destinationData = dragOverItem.current;

        if(!sourceData || !destinationData) return null;

        setData((pre) => {
            //when the list is same
        if(sourceData.heading == destinationData.heading){
            const list = [...pre[sourceData.heading]];
            const sourceIdx = sourceData.idx;
            const destinationIdx = destinationData.idx;

            const [removedItem] = list.splice(sourceIdx, 1);
            list.splice(destinationIdx, 0, removedItem);

            return{
                ...pre,
                [sourceData.heading]: list,
            }
        }else{
            //when the list is different
            const sourceList = [...pre[sourceData.heading]];
            const destinationList = [...pre[destinationData.heading]];

            const sourceIdx = sourceData.idx;
            const destinationIdx = destinationData.idx;

            const [removedItem] = sourceList.splice(sourceIdx, 1);
            destinationList.splice(destinationIdx, 0, removedItem);

            return {
                ...pre,
                [sourceData.heading]: sourceList,
                [destinationData.heading]: destinationList,
            }
        }
        })

        
    }

  return (
    < div style = {style.root}>
      {mainheadings.map((heading) => {
        return (
            <div key = {heading} style = {style.container}>
                <p style = {style.heading} >
                    {heading.replace("_", " ")}
                </p>
            <div 
                onDragOver = {(e) =>{
                    e.preventDefault();
                }} 
                onDrop = {handleDrop}
                onDragEnter = { (e) => {
                    if(data[heading].length === 0){
                        handleDragEnter(e, 0, heading);
                    }
                        
                }}
                style = {style.box}
            >
                
                {
                    data[heading].map((taskObj, idx) =>{
                        return (
                            <div 
                                draggable 
                                onDragStart = { (e) => {
                                    handleDragStart(e, heading, taskObj, idx);
                                }}
                                onDragEnter = { (e) => {
                                    handleDragEnter(e, idx, heading);
                                }}
                                onDragEnd = { (e) => {
                                    handleDragEnd(e);
                                }}

                                style = {style.taskContainer} key={taskObj.id}>
                            {taskObj.title}
                        </div>
                        );
                    })}
            </div>
            </div>
        );
      })}
    </div>
  );
}

export default DragAndDrop

const style = {
    root : {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: "#24B1B1"
    },
    container:{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        width: "25%",
    },
    box: {
        minHeight: "70px",
        width: "100%",
        backgroundColor: "#F5FBE6",
        padding: "30px",
        borderRadius: 6,
        border: "1px solid #215E61",
    },
    heading: {
        fontSize: "1.2rem",
        fontWeight:700,
        

    },
    taskContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        // border: "1px solid #215E61",
        gap: "10px",
        padding: "15px",
        margin: "10px",
        backgroundColor: "#FE7F2D",
        color: "white",
    }
}
