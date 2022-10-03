import React from "react";
import styled from 'styled-components'
interface TableInterface {
    dataList: any
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
    const subKeys:string[]|null = []; // 세부 항목의 키 값 저장
    if (indexOfSubSection !== -1) {
      Object.keys(value_sample[indexOfSubSection]).forEach((key:string) => {
        subKeys.push(key)
      })
    }
    
    return (
        <table style={{border: "1px solid black", borderCollapse: "collapse"}}>
            <thead>
                {
                    indexOfSubSection === -1 // 세부항목이 없다면
                    ?<tr>
                        {keys.map((th:string, index:number) => {
                            return(
                                <TH key={index}>{th}</TH>
                            )
                        })}
                    </tr>
                    :<><tr>
                        {keys.map((th:string, index:number) => {
                            return (
                                index !== indexOfSubSection
                                ? <TH key={index} rowSpan={2}>{th}</TH>  // 세부 항목 없는 열
                                : <TH key={index} colSpan={subKeys.length}>{th}</TH>  // 세부 항목 있는 열
                            )
                        })}
                    </tr>
                    <tr>
                        {subKeys.map((th:string, index:number) => {
                            return (
                                <TH key={index}>{th}</TH> // 세부 항목 키 값
                            )
                        })}
                    </tr></>
                }
            </thead>
            <tbody>
                {
                    values.map((item:any, index:number) => {
                        return (
                            <tr key={index}>
                                {item.map((td:string|object, index:number) => {  // 각 value (즉 하나의 제품) 에 대해
                                    return (
                                        typeof td === "string"   // cf. 세부항목이 있는 경우는 type이 object
                                        ? index === indexOfATag  // 세부항목이 없는 경우 중에서도 데이터 타입이 a tag 인 인덱스
                                        ? <TD key={index}><a href={td}>{td}</a></TD>
                                        : <TD key={index}>{td}</TD>
                                        : Object.values(td).map((subTd:string, index:number) => {  // 세부항목이 있는 경우는 object type이므로 다시 한 번 map
                                            return (
                                                <TD key={index}>{subTd}</TD>
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

const TH = styled.th`
    border: 1px solid black;
`;
const TD = styled.td`
    border: 1px solid black;
`

export default Table