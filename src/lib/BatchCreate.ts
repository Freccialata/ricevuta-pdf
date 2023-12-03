import {csvParse, type DSVRowArray} from "d3";
import { hadleGenerate, type dati_ricevuta } from "$lib/pdfme";

const checkColumns = (pared_csv: DSVRowArray<string>) => {
    let isOk = true
    isOk = isOk && (pared_csv.columns[0] == "Numero di ricevuta");
    isOk = isOk && (pared_csv.columns[1] == "Data di rilascio");
    isOk = isOk && (pared_csv.columns[2] == "Causale");
    isOk = isOk && (pared_csv.columns[3] == "Importo");
    isOk = isOk && (pared_csv.columns[4] == "Nome Acquirente");
    isOk = isOk && (pared_csv.columns[5] == "Canale");
    isOk = isOk && (pared_csv.columns[6] == "Note aggiuntive");
    return isOk;
}

const mapRow = (row: any) => {
    return {
        anno_fiscale: new Date(row["Data di rilascio"]).getFullYear().toString(),
        numero_ricevuta: row["Numero di ricevuta"],
        data_rilascio: row["Data di rilascio"],
        causale: row["Causale"],
        ricevuti_da: row["Importo"],
        importo: row["Nome Acquirente"],
        canale: row["Canale"],
        note_aggiuntive: row["Note aggiuntive"],
    } as dati_ricevuta
}

export const handleTransactionBook = (transazioni_csv: string) => {
    const transazioni = csvParse(transazioni_csv);
    console.log(transazioni);

    // * Quando capirò come scaricare in una cartella tutto quanto
    // const inizio_dato = transazioni[0]["Numero di ricevuta"]
    // const ultimo_dato = transazioni[transazioni.length-1]["Numero di ricevuta"]
    // const nome_cartella = `ricevute_${inizio_dato}-${ultimo_dato}`
    
    if (!checkColumns(transazioni)) {
        console.warn("CSV delle transazioni non valido");
        return;
    }

    transazioni.forEach(row => {
        const dati = mapRow(row);
        hadleGenerate(dati);
    })
}