import {useState} from "react";

const useMoreCustomSelects = () => {
    const [codes, setCodes] = useState<Array<{ code: string; setCode: (code: string) => void; }>>([]);

    const addNewCode = (initialCode: string) => {
        setCodes(prev => [
            ...prev,
            {
                code: initialCode,
                setCode: (code: string) => {
                    setCodes(currentCodes => {
                        const index = currentCodes.findIndex(item => item.code === initialCode);
                        if (index !== -1) {
                            const newCodes = [...currentCodes];
                            newCodes[index] = { ...newCodes[index], code: code };
                            return newCodes;
                        }
                        return currentCodes;
                    });
                }
            }
        ]);
    };

    return { codes, setCodes, addNewCode };
};

export default useMoreCustomSelects;