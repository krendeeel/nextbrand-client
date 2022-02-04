import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useRef } from 'react'
interface CustomSelectProps {
    value: string,
    setValue: (value: string) => void,
    label: string,
    arrayValues: Array<{
        label: string,
        value: string
    }>
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, setValue, label, arrayValues }) => {
    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <FormControl variant='outlined' fullWidth style={{ height: '20px', width: '150px', marginBottom: '25px' }}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                variant='standard'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
            >
                {
                    arrayValues.map(i => <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default CustomSelect;