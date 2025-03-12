import connection from "@/lib/dbconnect";
import { ExistingStudent } from "@/lib/type";
import { FieldPacket, ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
    try {
        const { StudentName, StudentClass, StudentSubject, StudentDoj, StudentFeesCycle, StudentFees, StudentIsDelist } = await req.json();

        if (!StudentName || !StudentClass || !StudentSubject || !StudentDoj || !StudentFeesCycle || !StudentFees || !StudentIsDelist) {
            return Response.json({ msg: 'Invalid Data' }, { status: 401 })
        }

        // Execute SELECT query and expect 'result' to contain an array of rows
        const [result]: [ExistingStudent[], FieldPacket[]] = await connection.execute(
            'SELECT Studentid,StudentName,StudentClass FROM student WHERE StudentName=? AND StudentClass=?',
            [StudentName, StudentClass]
        );

        if (result.length !== 0) {
            return Response.json({ msg: 'Student Already Exists' }, { status: 401 })

        }

        const id = StudentName + '-' + Date.now()

        const currentdate = new Date(StudentDoj)
        const currentMonth = currentdate.getMonth()
        const currentYear = currentdate.getFullYear()

        const [insertResult]: [ResultSetHeader, FieldPacket[]] = await connection.execute('INSERT INTO student (Studentid, StudentName, StudentClass, StudentSubject,StudentDoj,StudentFeesCycle,StudentFees,StudentIsDelist) VALUES (?,?,?,?,?,?,?,?)', [id, StudentName, StudentClass, StudentSubject, currentdate, StudentFeesCycle, StudentFees, StudentIsDelist])



        if (insertResult.affectedRows !== 1) {
            return Response.json({ msg: 'Customer Is Not Added' }, { status: 401 })

        }

        const studentFeesRecord = []
        if (currentMonth <= 3) {
            for (let month = 1; month <= 3; month++) {

                studentFeesRecord.push([
                    `${id}-${Date.now()}-${month}`,
                    id,
                    0,
                    month,
                    currentYear,
                    null,
                    "No"
                ]);
            }
        }
        else {
            for (let month = currentMonth; month <= 12; month++) {
                studentFeesRecord.push([
                    `${id}-${Date.now()}-${month}`,
                    id,
                    0,
                    month,
                    currentYear,
                    null,
                    "No"
                ]);
            }
            for (let month = 1; month <= 3; month++) {
                studentFeesRecord.push([
                    `${id}-${Date.now()}-${month}`,
                    id,
                    0,
                    month,
                    currentYear + 1,
                    null,
                    "No"
                ]);
            }


        }

        const bulkInsertQuery = `
        INSERT INTO studentfees(id, Studentid, FeesPaid, month, year, payDate, payStatus) VALUES ?`;

        const result2: [ResultSetHeader, FieldPacket[]] = await connection.query(bulkInsertQuery, [studentFeesRecord]);

        if (result2[0].affectedRows === 0) {
            return Response.json({ msg: 'Student Not Added' }, { status: 401 })

        }
        return Response.json({ msg: 'Student Added Successfully' }, { status: 201 })
    } catch (err) {
        console.error(err);
        return Response.json({ msg: 'Server Error' }, { status: 500 })
    }
}