import {csvParse, type DSVRowArray, type DSVRowString} from "d3";
import { hadleGenerate, type dati_ricevuta } from "$lib/pdfme";
import { writable } from "svelte/store";

export const bar_percentage = writable(0)

const checkColumns = (parsed_csv: DSVRowArray<string>) => {
    let isOk = true
    isOk = isOk && (parsed_csv.columns[0] == "Numero di ricevuta");
    isOk = isOk && (parsed_csv.columns[1] == "Data di rilascio");
    isOk = isOk && (parsed_csv.columns[2] == "Causale");
    isOk = isOk && (parsed_csv.columns[3] == "Importo");
    isOk = isOk && (parsed_csv.columns[4] == "Nome Acquirente");
    isOk = isOk && (parsed_csv.columns[5] == "Canale");
    isOk = isOk && (parsed_csv.columns[6] == "Note aggiuntive");

    const firstrow_date_val = parsed_csv[0]["Data di rilascio"].split(".")
    isOk = isOk && firstrow_date_val.length == 3
    return isOk;
}

const mapRow = (row: DSVRowString<string>) => {
    let data_rilascio_obj = dateParserEur(row["Numero di ricevuta"], row["Data di rilascio"]);
    
    return {
        anno_fiscale: data_rilascio_obj.getFullYear().toString(),
        numero_ricevuta: row["Numero di ricevuta"],
        data_rilascio: data_rilascio_obj,
        causale: row["Causale"],
        ricevuti_da: row["Nome Acquirente"],
        importo: row["Importo"],
        canale: row["Canale"],
        note_aggiuntive: row["Note aggiuntive"],
    } as dati_ricevuta
}

const invalid_dati_ricevuta = (d: dati_ricevuta): boolean => {
    return d.anno_fiscale === 'NaN' ||
        d.anno_fiscale.length < 4 ||  
        d.data_rilascio.toString() === 'Invalid Date' ||
        d.canale.length < 1 ||
        d.causale.length < 1 ||
        d.importo.length < 1 ||
        d.numero_ricevuta.length < 1 ||
        d.ricevuti_da.length < 1
}

export const handleTransactionBook = async (transazioni_csv: string) => {
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

    for (let i = 0; i < transazioni.length; i++) {
        if (i!=0 && i%10 == 0) {
            await sleep(2400)
        }
        const row = transazioni[i];
        const dati = mapRow(row);
        if (invalid_dati_ricevuta(dati)) {
            console.log("RIGA RICEVUTA NON VALIDA", dati);
        } else {
            console.log("Creo PDF per ricevuta", dati.numero_ricevuta);
            hadleGenerate(dati);
            
        }
        const perc = Math.round(((i+1) / transazioni.length) * 100);
        console.log(perc, "%");
        bar_percentage.set(perc) // WRITABLE
    }
}

export const sleep = (ms: number) => {
    return new Promise<undefined>(resolve => setTimeout(resolve, ms));
}

/** Parse and enforce `dd/mm/yyyy` date format */
const dateParserEur = (num_ricevuta: string, data_rilascio_txt: string) => {
    let data_rilascio_split = data_rilascio_txt.split("/");
    if (data_rilascio_split.length != 3) {
        data_rilascio_split = data_rilascio_txt.split(".");
    }
    if (data_rilascio_split.length != 3) {
        return new Date("Invalid Date");
    }

    const data_rilascio_usa = `${data_rilascio_split[1]}.${data_rilascio_split[0]}.${data_rilascio_split[2]}`
    const data_rilascio_obj = new Date(data_rilascio_usa)
    if (data_rilascio_obj.toString() === "Invalid Date") {
        console.error( "Ricevuta", num_ricevuta,
            "\nNon riesco a leggere la data", data_rilascio_txt,
            "\nPotrebbe essere in formato americano?"
        );
    }
    return data_rilascio_obj
}