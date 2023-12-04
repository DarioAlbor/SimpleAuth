// PDF.tsx
import React, { useEffect } from 'react';
import PDFList from './PDFList.tsx';
import { Data } from './data/PDFListData.ts';
import IPDFList from './models/PDFList.model.ts';

function PDF() {
    const data: IPDFList[] = Data;

        useEffect(() => {
            document.onkeydown = function (e) {
                if (e.ctrlKey || e.altKey) {
                    return false;
                }
            };

            window.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            }, false);
        }, [])
        
        return (
            <div className="small-space">
                <div className='container'>
                    <h1 className='main-title'>✨ REVISTA VIA SALUD ✨</h1>
                    <PDFList lists={data} />
                </div>
            </div>
        );
 }

export default PDF;
