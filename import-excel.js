import XLSX from 'xlsx';

// Read the Excel file
const workbook = XLSX.readFile('attached_assets/CONTROLE DE ATIVOS TI_1752094693518.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Processing equipment data...');

// Process the data starting from row 3 (skip headers)
const equipmentData = [];
for (let i = 3; i < data.length; i++) {
    const row = data[i];
    
    // Skip empty rows
    if (!row || !row["__EMPTY_1"] || !row["__EMPTY_2"]) continue;
    
    try {
        const equipment = {
            id: i - 2, // Sequential ID starting from 1
            equipmentId: `EQ${String(row["__EMPTY_1"]).padStart(3, '0')}`,
            name: row["__EMPTY_2"] || "Equipamento sem nome",
            category: determineCategory(row["__EMPTY_2"] || ""),
            model: row["__EMPTY_4"] || "Modelo não informado",
            serialNumber: row["__EMPTY_3"] || "S/N",
            status: row["__EMPTY_5"] ? "assigned" : "available",
            location: row["Hoje"] || "Local não informado",
            assignedTo: row["__EMPTY_5"] || null,
            notes: [
                row["__EMPTY_6"] ? `Setor: ${row["__EMPTY_6"]}` : null,
                row["7/9/25"] ? `Acessórios: ${row["7/9/25"]}` : null,
                row["__EMPTY_7"] ? `Obs: ${row["__EMPTY_7"]}` : null
            ].filter(Boolean).join(" | ") || null
        };
        
        equipmentData.push(equipment);
    } catch (error) {
        console.error('Error processing row:', i, error);
    }
}

function determineCategory(description) {
    const desc = description.toLowerCase();
    if (desc.includes('nb') || desc.includes('notebook') || desc.includes('vaio') || desc.includes('laptop')) {
        return 'notebook';
    } else if (desc.includes('monitor')) {
        return 'monitor';
    } else if (desc.includes('desktop') || desc.includes('pc') || desc.includes('dell') || desc.includes('all in one') || desc.includes('mini pc')) {
        return 'desktop';
    } else if (desc.includes('celular') || desc.includes('phone') || desc.includes('motorola') || desc.includes('samsung')) {
        return 'mobile';
    } else if (desc.includes('impressora') || desc.includes('printer')) {
        return 'printer';
    } else {
        return 'other';
    }
}

console.log(`Processed ${equipmentData.length} equipment items`);

// Generate JavaScript code for the HTML file
const jsCode = `
// Auto-imported equipment data
const importedEquipment = ${JSON.stringify(equipmentData, null, 2)};

// Replace the sample data with imported data
equipment = importedEquipment;
`;

// Write the JavaScript code to a file
import fs from 'fs';
fs.writeFileSync('equipment-data.js', jsCode);

console.log('Equipment data exported to equipment-data.js');
console.log('Sample equipment:');
console.log(equipmentData.slice(0, 5));