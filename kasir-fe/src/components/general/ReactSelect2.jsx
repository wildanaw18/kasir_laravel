import React from 'react'
import Select from 'react-select'

class Select2Example extends React.Component {
    state = {
        selectedOption: null,
        typeSelect: null,
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
        this.props.setSelectedOption(selectedOption)
    }

    resetForms = () => {
        this.setState({ selectedOption: null })
    }

    render() {
        const { typeSelect, selectedOption, options, placeholder } = this.props

        // Menentukan lebar pilihan (misalnya 300px)
        const customStyles = {
            control: (provided) => ({
                ...provided,
                width: '100%', // Sesuaikan dengan lebar yang Anda inginkan
            }),
        }

        // Tambahkan placeholder sesuai kebutuhan Anda

        return (
            <div>
                <Select
                    value={typeSelect === 'edit' ? selectedOption : this.state.selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    styles={customStyles}
                    placeholder={placeholder} // Tambahkan properti placeholder
                />
            </div>
        )
    }
}

export default Select2Example
