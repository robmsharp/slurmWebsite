import { useState } from "react";

//Format of data:
//key, [fileName, imageURL, include, percent, position, mandatory]

//Set percent to -1 if not uploaded
const useImage = (initialLength = 1, generic="image", initialData = new Map([["image0", [null, null, false, -1, -1, false]]])) => {
    const [data, setData] = useState(initialData);
    const [length, setLength] = useState(initialLength);

    //Used for reseting the data
    const resetData = (newData) => {
        setData(newData);
    }

    //Add slot for later upload
    const addImageSlot = (include, name) => {
        setData(prevData => {
            const newData = new Map(prevData);
            const newKey = generic.concat(length);
            setLength(prev=>prev+1);
            newData.set(newKey, [null, null, false, -1, -1, false]);
            return newData;
        });
    };

    const updatePercentage = (key, percentage) => {

        changeData(key, percentage, "percentageUpdate");

    }

    const updatePosition = (key, position) => {

        changeData(key, position, "positionUpdate");

    }

    const updateImageURL = (key, imageURL) => {

        changeData(key, imageURL, "imageURLUpdate");

    }

    const updateFileName = (key, fileName) => {

        changeData(key, fileName, "fileNameUpdate");

    }

    const updateInclude = (key, include) => {

        changeData(key, include, "includeUpdate");
    
    }

    //Change the include to the opposite
    const toggleInclude = (key) => {

        const [fileName, imageURL, include, percent, position, mandatory] = getData(key);
        changeData(key, !include, "includeUpdate");
    
    }

    const getData = (key) => {

        return data.get(key);

    }

    const verifyImage = (image, key) => {

        const [fileName, imageURL, include, percent, position, mandatory] = image;

        if (include===true) {
            if (!fileName) {return [false, key+" is missing an image"]};
            if (percent<100) {return [false, key+" has not finished uploading"]};
        }

        return [true, ""];

    }

    const verify = () => {

        //verify cover
        if (getData("cover image") === undefined) {
            return [false, "Missing cover image"];
        }

        //Verify each image has uploaded if it is "included"
        Array.from(data).forEach(([key, image]) => {


            const [status, message] = verifyImage(image, key);

            if (status === false) {
                return [status, message];
            }

        }
        );

        return [true, ""];

    }

    const getCover = () => {

        return getData("cover image")[0];

    }

    const getScreenshots = () => {

        var id=1;

        const result = Array.from(data).reduce((acc, [key, [fileName, imageURL, include, percent, position, mandatory]]) => {
            if (include) {
              acc.push({ id: id++, fileName, position });
            }
            return acc;
          }, []);

        return result;  

    }


    const changeData = (key, updatedValue, updateType) => {
        setData(prevData => {
            const newData = new Map(prevData);
            const [fileName, imageURL, include, percent, position, mandatory] = prevData.get(key);
            
            switch (updateType) {
                case "fileNameUpdate":
                  newData.set(key, [updatedValue, imageURL, include, percent, position, mandatory]);
                  break;
                case "imageURLUpdate":
                  newData.set(key, [fileName, updatedValue, include, percent, position, mandatory]);
                  break;
                case "includeUpdate":
                  newData.set(key, [fileName, imageURL, updatedValue, percent, position, mandatory]);
                  break;
                
                case "percentageUpdate":
                  newData.set(key, [fileName, imageURL, include, updatedValue, position, mandatory]);
                  break;
                case "positionUpdate":
                    newData.set(key, [fileName, imageURL, include, percent, updatedValue, mandatory]);
                    break;  
                default:
                  break;
            }
              
            return newData;
        });
    };

    return [data, getData, addImageSlot, updatePercentage, updateImageURL, updateFileName, updateInclude, updatePosition, toggleInclude, resetData, getCover, getScreenshots, verify];

};

export default useImage;
