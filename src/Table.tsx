import React from "react";
interface TableInterface {
    dataList: any
    // keys: string[],
    // values: any[], // 세부 항목이 있는 경우 string이 아닌 object일 수 있으므로 any[]
    // subKeys: string[], // 세부 항목이 없다면 빈 배열, 있다면 string 배열
    // subSection: number, // 세부 항목 없다면 -1, 있다면 인덱스값 (-1 아닌 값)
}
const Table = (props: TableInterface) => {
    const keys = Object.keys(props.dataList[0]) // ['name', 'price',...]
    const values: any[] = [];
    props.dataList.forEach((obj:object) => {
      values.push(Object.values(obj))
    })
    // console.log(values)
    const value_sample = values[0]
    let indexOfSubSection = -1; // 세부 항목 없는 경우 -1, 있는 경우 인덱스값 (-1 아닌 값)
    let indexOfATag:number = -1; // a tag인 칼럼 없으면 -1, 있으면 인덱스값 (-1 아닌 값)
    {
      for (let i=0; i<keys.length; i++) {
        if (typeof value_sample[i] == "object") {
          indexOfSubSection = i; // 세부 항목이 있는 인덱스 저장
        }
        if (keys[i] === 'link') {
            indexOfATag = i; // 데이터가 a tag (th가 'link') 인 칼럼 인덱스 저장
        }
      }
    }
    const subKeys:string[]|null = [];
    if (indexOfSubSection != -1) {
      Object.keys(value_sample[indexOfSubSection]).forEach((key:string) => {
        subKeys.push(key)
      })
    }
    
    return (
        <table>
            <thead>
                {
                    indexOfSubSection === -1 // 세부항목이 없다면
                    ?<tr>
                        {keys.map((th:string, index:number) => {
                            return(
                                <th key={index}>{th}</th>
                            )
                        })}
                    </tr>
                    :<><tr>
                        {keys.map((th:string, index:number) => {
                            return (
                                index !== indexOfSubSection
                                ? <th key={index} rowSpan={2}>{th}</th>
                                : <th key={index} colSpan={subKeys.length}>{th}</th>
                            )
                        })}
                    </tr>
                    <tr>
                        {Object.keys(values[0][indexOfSubSection]).map((th:string, index:number) => {
                            return (
                                <th key={index}>{th}</th>
                            )
                        })}
                    </tr></>
                }
            </thead>
            <tbody>
                {
                    values.map((item:any, index:number) => {
                        return (
                            <tr>
                                {item.map((td:string|object, index:number) => {
                                    return (
                                        typeof td === "string"
                                        ? index === indexOfATag
                                        ? <a href={td}><td>{td}</td></a>
                                        : <td>{td}</td>
                                        : Object.values(td).map((subItem:string, index:number) => {
                                            return (
                                                <td>{subItem}</td>
                                            )
                                        })
                                    )
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table