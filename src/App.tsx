import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import iPadList from './sample_data/iPadList.json'
import iPhoneList from './sample_data/iPhoneList.json'
import MacList from './sample_data/MacList.json'

import Table from './Table';
function App() {
  const types = Object.keys(MacList.items[0]) //['iMac','MacBook']
  const [selectedType, setSelectedType] = useState('iMac')
  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedType(event.target.value)
    console.log(event)
  }
  const temp:{[key:string]:object[]} = MacList.items[0]
  const selectedMac:object[] = temp[selectedType] // [{'name':...,...,},{...}]
  return (
    <>
    <h3>아이폰 상세정보</h3>
    <Table dataList={iPhoneList.items} />
    <br/><br/>

    <h3>아이패드 상세정보</h3>
    <Table dataList={iPadList.items} />
    <br/><br/>
    
    {/* 아이맥, 맥북 등 맥 리스트는 별도로 관리 */}
    <h3>맥 상세정보</h3>
    <select onChange={handleChangeType}>
      {
        types.map((type:string, index:number) => {
          return (
            <option key={index} value={type}>{type}</option>
          )
        })
      }
    </select>
    <Table dataList={selectedMac} />
    </>
  );
}

export default App;
