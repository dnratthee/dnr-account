export default [
    { id: 1, name: "สินค้า", parentId: null },
    { id: 2, name: "สินค้าไว้ขาย", parentId: 1 },
    { id: 3, name: "ค่าน้ำมัน", parentId: null },
    { id: 4, name: "ค่าเดินทาง", parentId: null },
    { id: 5, name: "ค่าใช้จ่ายในสำนักงาน", parentId: null },
    { id: 6, name: "ค่าส่งเอกสาร", parentId: 5 },
    { id: 7, name: "วัสดุสำนักงาน", parentId: 5 },
    { id: 8, name: "โปรแกรม", parentId: 5 },
    { id: 9, name: "ค่าไฟ", parentId: 5 },
    { id: 10, name: "ค่าน้ำ", parentId: 5 },
    { id: 11, name: "ค่าโทรศัพท์", parentId: 5 },
    { id: 12, name: "ค่าอินเตอร์เน็ต", parentId: 5 },
];
