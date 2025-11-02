const fs = require("fs")
const path = require("path")

// --- HELPERS ---
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const lowerCase = (str) => str.toLowerCase()

// --- TEMPLATES ---

const componentTemplate = (componentName) => `import type { FC, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/common';

interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ${componentName}: FC<${componentName}Props> = (props) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      className={cn('', {}, [className])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
`

const indexTemplate = (componentName) => `export * from './${componentName}';`

const reduxSliceTemplate = (sliceName) => {
  const lowerSliceName = lowerCase(sliceName)
  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: Adjust the import to your actual StateSchema path
// import { StateSchema } from 'app/providers/StoreProvider';

export interface ${sliceName}Schema {
  // TODO: Define state shape
}

const initialState: ${sliceName}Schema = {
  // TODO: Define initial state
};

const ${sliceName}Slice = createSlice({
  name: '${lowerSliceName}',
  initialState,
  reducers: {
    // template: (state, action: PayloadAction<string>) => {
    //   
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(someAsyncThunk.pending, (state) => {
  //       // TODO: Handle pending
  //     })
  //     .addCase(someAsyncThunk.fulfilled, (state, action) => {
  //       // TODO: Handle fulfilled
  //     })
  //     .addCase(someAsyncThunk.rejected, (state, action) => {
  //       // TODO: Handle rejected
  //     });
  // },
});

export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
`
}

const reduxSelectorsTemplate = (
  sliceName
) => `// TODO: Adjust the import to your actual StateSchema path
// import { StateSchema } from 'app/providers/StoreProvider';

// export const getSomeData = (state: StateSchema) => state.${lowerCase(sliceName)}?.someData;
`

const reduxServicesTemplate = (sliceName) => `import { createAsyncThunk } from '@reduxjs/toolkit';

// TODO: Adjust the import to your actual ThunkConfig path
// import { ThunkConfig } from 'app/providers/StoreProvider';

// export const fetchData = createAsyncThunk<
//   DataType, // Return type
//   ArgType,  // Argument type
//   ThunkConfig<string>
// >(
//   '${lowerCase(sliceName)}/fetchData',
//   async (arg, thunkApi) => {
//     const { extra, rejectWithValue } = thunkApi;
//
//     try {
//       const response = await extra.api.get<DataType>('/your-endpoint');
//
//       if (!response.data) {
//         throw new Error();
//       }
//
//       return response.data;
//     } catch (e) {
//       return rejectWithValue('error');
//     }
//   },
// );
`

const entityTypesTemplate = (sliceName) => `export interface ${sliceName} {
  id: string;
  // TODO: Define type
}`

const featureIndexTemplate = (sliceName) => `export * from './ui';
export type { ${sliceName}Schema } from './model/slice';
`

const entityIndexTemplate = (
  sliceName
) => `export { ${sliceName}Card } from './ui/${sliceName}Card';
export type { ${sliceName} } from './model/types';
export type { ${sliceName}Schema } from './model/slice';
`

const pageTemplate = (pageName) => `import { FC } from 'react';

const ${pageName}Page: FC = () => {
  return (
    <div>
      <h1>${pageName} Page</h1>
    </div>
  );
};

export default ${pageName}Page;
`

// --- MAIN LOGIC ---

const layer = process.argv[2]
const sliceName = process.argv[3]

if (!layer || !sliceName) {
  console.error("Ошибка: Укажите слой и имя слайса.")
  console.log("Пример: npm run generate feature AuthByEmail")
  process.exit(1)
}

const layers = ["feature", "entity", "widget", "app", "ui"]
if (!layers.includes(layer)) {
  console.error(`Ошибка: Неверный слой '${layer}'. Доступные слои: ${layers.join(", ")}`)
  process.exit(1)
}

const capitalizedSliceName = capitalize(sliceName)
const componentName = capitalizedSliceName

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content)
}

const generateFeature = () => {
  const featureDir = path.join("src", "features", capitalizedSliceName)
  if (fs.existsSync(featureDir)) {
    console.error(`Ошибка: Фича '${capitalizedSliceName}' уже существует.`)
    return
  }

  const uiDir = path.join(featureDir, "ui")
  const modelDir = path.join(featureDir, "model")

  createDir(uiDir)
  createDir(modelDir)

  createFile(path.join(uiDir, `${componentName}.tsx`), componentTemplate(componentName))
  createFile(path.join(uiDir, "index.ts"), indexTemplate(componentName))

  createFile(path.join(modelDir, "slice.ts"), reduxSliceTemplate(componentName))
  createFile(path.join(modelDir, "selectors.ts"), reduxSelectorsTemplate(componentName))
  createFile(path.join(modelDir, "services.ts"), reduxServicesTemplate(componentName))
  createFile(path.join(modelDir, "types.ts"), entityTypesTemplate(componentName))

  createFile(path.join(featureDir, "index.ts"), featureIndexTemplate(componentName))
}

const generateEntity = () => {
  const entityDir = path.join("src", "entities", capitalizedSliceName)
  if (fs.existsSync(entityDir)) {
    console.error(`Ошибка: Сущность '${capitalizedSliceName}' уже существует.`)
    return
  }

  const uiDir = path.join(entityDir, "ui", `${componentName}Card`)
  const modelDir = path.join(entityDir, "model")

  createDir(uiDir)
  createDir(modelDir)

  createFile(
    path.join(uiDir, `${componentName}Card.tsx`),
    componentTemplate(`${componentName}Card`)
  )
  createFile(path.join(uiDir, "index.ts"), indexTemplate(`${componentName}Card`))
  createFile(path.join(modelDir, "slice.ts"), reduxSliceTemplate(componentName))
  createFile(path.join(modelDir, "types.ts"), entityTypesTemplate(componentName))
  createFile(path.join(entityDir, "index.ts"), entityIndexTemplate(componentName))
}

const generateWidget = () => {
  const widgetDir = path.join("src", "widgets", capitalizedSliceName)
  if (fs.existsSync(widgetDir)) {
    console.error(`Ошибка: Виджет '${capitalizedSliceName}' уже существует.`)
    return
  }

  const uiDir = path.join(widgetDir, "ui")
  createDir(uiDir)

  createFile(path.join(uiDir, `${componentName}.tsx`), componentTemplate(componentName))
  createFile(path.join(uiDir, "index.ts"), indexTemplate(componentName))
  createFile(path.join(widgetDir, "index.ts"), `export * from './ui';`)
}

const generateAppPage = () => {
  const pageDir = path.join("src", "app", "(pages)", lowerCase(sliceName))
  if (fs.existsSync(pageDir)) {
    console.error(`Ошибка: Страница '${sliceName}' уже существует.`)
    return
  }
  createDir(pageDir)
  createFile(path.join(pageDir, `page.tsx`), pageTemplate(componentName))
}

const generateSharedUi = () => {
  const componentDir = path.join("src", "shared", "ui", capitalizedSliceName)
  if (fs.existsSync(componentDir)) {
    console.error(`Ошибка: UI-компонент '${capitalizedSliceName}' уже существует.`)
    return
  }
  createDir(componentDir)
  createFile(path.join(componentDir, `${componentName}.tsx`), componentTemplate(componentName))
  createFile(path.join(componentDir, "index.ts"), indexTemplate(componentName))
}

// --- SCRIPT EXECUTION ---

console.log(`Запускаю генератор для слоя '${layer}' с именем '${sliceName}'...`)

switch (layer) {
  case "feature":
    generateFeature()
    break
  case "entity":
    generateEntity()
    break
  case "widget":
    generateWidget()
    break
  case "app":
    generateAppPage()
    break
  case "ui":
    generateSharedUi()
    break
  default:
    console.error("Неизвестный слой")
}

console.log("Генерация завершена.")
