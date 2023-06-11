import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { RiFileExcel2Fill } from 'react-icons/ri';
import style from './excelDownload.module.css';

const ExcelDownload = ({ id, style2, name }) => {

    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className={style2}
                table={id}
                filename={name}
                sheet="tablexls"
                buttonText={
                    <>
                        <RiFileExcel2Fill className={style.icon} />
                        <p>Exportar a excel</p>
                    </>
                }
            />
        </div>
    )
}

export default ExcelDownload
