import React, { useState, useEffect } from 'react'

function RateModal({ show, onHide, onSave, isEditMode, data }) {
    const [originCity, setOriginCity] = useState('')
    const [destinationCity, setDestinationCity] = useState('')
    const [portToPortId, setPortToPortId] = useState('')
    const [rateClass, setRateClass] = useState('')

    useEffect(() => {
        if (isEditMode && data) {
            // Jika dalam mode edit, isi formulir dengan data yang ada
            setOriginCity(data.originCity)
            setDestinationCity(data.destinationCity)
            setPortToPortId(data.portToPortId)
            setRateClass(data.rateClass)
        }
    }, [isEditMode, data])

    const handleSave = () => {
        // Validasi input di sini jika diperlukan

        const rateData = {
            originCity,
            destinationCity,
            portToPortId,
            rateClass,
        }

        // Panggil onSave dan lewatkan data tarif
        onSave(rateData)

        // Tutup modal setelah menyimpan atau memperbarui data
        onHide()
    }

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Edit' : 'Create'} Rate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {/* Input fields for rate details */}
                        <div className="mb-3">
                            <label>Origin City</label>
                            <input type="text" value={originCity} onChange={(e) => setOriginCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Destination City</label>
                            <input type="text" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Port-to-Port ID</label>
                            <input type="text" value={portToPortId} onChange={(e) => setPortToPortId(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Rate Class</label>
                            <input type="text" value={rateClass} onChange={(e) => setRateClass(e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={onHide}>
                        Batal
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Simpan
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RateModal
