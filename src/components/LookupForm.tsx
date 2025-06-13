import React, { useState } from "react"
import { Input } from "./ui/input"
 
const LookupForm = () => {
  const [name, setName] = useState("")
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [categoryType] = useState(["Category 1", "Category 2", "Category 3"]) // Sample categories
  const [index, setIndex] = useState<number>(0)  // Ensure this is a number
  const [remark, setRemark] = useState("")

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
  }

  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setIndex(value ? Number(value) : 0)  // Convert string to number
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label>Name</label>
        <Input
          placeholder="Enter lookup name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="lookupValue">Value</label>
        <Input
          id="lookupValue"
          placeholder="Enter lookup value"
          value={value}
          onChange={(e) => setValue(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="lookupDescription">Description</label>
        <Input
          id="lookupDescription"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an option
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={type}
          onChange={changeValue}
        >
          <option value="">Choose a category</option>
          {categoryType.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="index">Index</label>
        <Input
          type="number"
          placeholder="Enter index"
          value={index}
          onChange={handleIndexChange}  // Ensure value is a number
        />
      </div>
      <div>
        <label htmlFor="remark">Remark</label>
        <Input
          value={remark}
          onChange={(e) => setRemark(e.target.value)} 
        />
      </div>
    </div>
  )
}

export default LookupForm
