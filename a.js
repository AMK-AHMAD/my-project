const users = [
    { id: 101, name: " Ada ", scores: [10, 20, 30] },
    { id: 102, name: "", scores: [5, 0, 15] },
    { id: 103, name: null, scores: [7, 14] },
    { id: 104, /* name missing on purpose */ scores: [3, 3, 3, 3] },
    { id: 105, name: "Grace", scores: [] }
];

// 1. تنظيف الاسم
function normalizeName(value) {
    if (value === null || value === undefined || typeof value !== "string") {
        return "Unknown";
    }
    const trimmed = value.trim();
    return trimmed === "" ? "Unknown" : trimmed;
}

// 2. حساب معدل الدرجات
function averageScore(scores) {
    if (!Array.isArray(scores)) {
        throw new Error("scores must be an array");
    }
    if (scores.length === 0) {
        return null;
    }
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    const avg = sum / scores.length;
    return Math.round(avg * 100) / 100;
}

// 3. بناء ملخص المستخدم
function buildUserSummary(user) {
    if (typeof user !== "object" || user === null || Array.isArray(user)) {
        throw new Error("user must be an object");
    }

    // استخدام الأقواس المربعة (Bracket notation) والنقطة (Dot notation)
    const rawScores = user["scores"];
    const validScores = Array.isArray(rawScores) ? rawScores : [];

    return {
        id: user.id,
        name: normalizeName(user.name),
        scoreCount: validScores.length,
        avg: averageScore(validScores)
    };
}


// 4. تلخيص جميع المستخدمين
function summarizeUsers(userArray) {
    if (!Array.isArray(userArray)) {
        throw new Error("userArray must be an array");
    }
    return userArray.map(buildUserSummary);
}

// 5. التلخيص الآمن باستخدام try/catch
function safeSummarizeUsers(userArray) {
    try {
        const result = summarizeUsers(userArray);
        return { ok: true, data: result };
    } catch (error) {
        return { ok: false, error: error.message };
    }
}

// 6. البحث عن اسم المستخدم بالرقم التعريفي
function getUserDisplayNameById(userArray, id) {
    if (!Array.isArray(userArray)) {
        throw new Error("userArray must be an array");
    }
    if (typeof id !== "number") {
        throw new Error("id must be a number");
    }
    const found = userArray.find(user => user.id === id);
    if (!found) {
        throw new Error("user not found");
    }
    return normalizeName(found.name);
}

// Part C answers:
// 1) typeof undefined = "undefined"
// 2) typeof null = "object"
// 3) Why treat "" differently than null/undefined in normalizeName (conceptually)?
// Conceptually, null and undefined represent the absence of a value (missing data), whereas "" is a valid string data type that happens to have zero characters (empty input), so we can safely call string methods like .trim() on it after checking its type.

// Required test calls:
console.log(normalizeName(" Ada "));               // expected: "Ada"
console.log(normalizeName("   "));                 // expected: "Unknown"
console.log(normalizeName(null));                  // expected: "Unknown"
console.log(averageScore([10, 20, 30]));           // expected: 20
console.log(averageScore([]));                     // expected: null
console.log(buildUserSummary(users[0]));           // expected: { id: 101, name: "Ada", scoreCount: 3, avg: 20 }
console.log(buildUserSummary(users[3]));           // expected: { id: 104, name: "Unknown", scoreCount: 4, avg: 3 }
console.log(safeSummarizeUsers(users).ok);         // expected: true
console.log(getUserDisplayNameById(users, 105));   // expected: "Grace"
console.log(safeSummarizeUsers("not an array"));   // expected: { ok: false, error: "userArray must be an array" }