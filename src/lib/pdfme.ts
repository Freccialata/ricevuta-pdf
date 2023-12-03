import { type Template, generate } from "@pdfme/generator";

const loadTemplateFromStaticFolder = async () => {
    const ricevuta_template_f = await fetch("ricevuta_template.json");
    const ricevuta_template = await ricevuta_template_f.json();
    return ricevuta_template as Template;
}

const template = await loadTemplateFromStaticFolder(); 

export type dati_ricevuta = {
    anno_fiscale: string,
    numero_ricevuta: string,
    data_rilascio: string,
    causale: string,
    ricevuti_da: string,
    importo: string,
    canale: string,
    note_aggiuntive: string,
};

const mapInputs = (dati: dati_ricevuta) =>  {
    let clean_numero_ricevuta = `${dati.anno_fiscale}/${dati.numero_ricevuta}`;

    let clean_data_rilascio = new Date(dati.data_rilascio).toLocaleDateString()

    let clean_note_aggiuntive = "";
    if (dati.note_aggiuntive.length < 1) {
        clean_note_aggiuntive = "/"
    } else {
        clean_note_aggiuntive = dati.note_aggiuntive
    }

    return [{
        numero_ricevuta: clean_numero_ricevuta,
        data_rilascio: clean_data_rilascio, // make sure it's a date?
        causale: dati.causale,
        ricevuti_da: dati.ricevuti_da,
        importo: `€ ${dati.importo}`,
        canale: dati.canale,
        note_aggiuntive: clean_note_aggiuntive,
    }]
}

export const hadleGenerate = (dati_compilati: dati_ricevuta) => {

    const inputs = mapInputs(dati_compilati)

    generate({ template, inputs }).then((pdf) => {
        // Download dal Browser
        const ricevuta_blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        // window.open(URL.createObjectURL(ricevuta_blob)); // se si deve aprire in una nuova pagina
        const ricevuta_pdf = URL.createObjectURL(ricevuta_blob);
        const randbits_file_anchor = document.createElement('a');
        randbits_file_anchor.href = ricevuta_pdf;
        const nome_file = `ricevuta_${dati_compilati.anno_fiscale}_${dati_compilati.numero_ricevuta}.pdf`
        randbits_file_anchor.download = nome_file;
        randbits_file_anchor.click();
    });
}