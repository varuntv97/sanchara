# Sanchara - AI-Powered Travel Planner

![Sanchara Logo](./public/logo.png)

## Overview

Sanchara is an AI-powered travel planning platform that helps users discover, plan, and organize their perfect trips. The application leverages Google Gemini AI to provide personalized travel recommendations based on user preferences, budget constraints, and travel dates.

1. Install dependencies:

```shellscript
npm install
# or
yarn install
```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Setup

1. Create a new project in Supabase
2. Run the following SQL queries to set up your database schema:

```sql
-- Users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(10,2),
  interests TEXT[] DEFAULT '{}',
  image_url TEXT,
  accommodation_type TEXT,
  transportation_type TEXT,
  dietary_preferences TEXT[] DEFAULT '{}',
  accessibility_needs TEXT[] DEFAULT '{}',
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Itinerary days table
CREATE TABLE IF NOT EXISTS itinerary_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE NOT NULL,
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  activities JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Packing lists table
CREATE TABLE IF NOT EXISTS packing_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Packing items table
CREATE TABLE IF NOT EXISTS packing_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  packing_list_id UUID REFERENCES packing_lists(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  is_packed BOOLEAN NOT NULL DEFAULT false,
  is_essential BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Itineraries policies
CREATE POLICY "Users can view their own itineraries" ON itineraries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own itineraries" ON itineraries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries" ON itineraries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries" ON itineraries
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for itinerary_days, packing_lists, and packing_items
-- (Add as needed)
```

## Project Structure

```plaintext
sanchara-travel-planner/
├── app/
│   ├── about/                # About page
│   ├── api/                  # API routes
│   │   ├── generate-itinerary/
│   │   ├── itineraries/
│   │   ├── itinerary/
│   │   ├── profile/
│   │   └── send-email/
│   ├── blog/                 # Blog page
│   ├── contact/              # Contact page
│   ├── cookies/              # Cookie policy page
│   ├── create-itinerary/     # Create itinerary page
│   ├── dashboard/            # User dashboard
│   ├── itinerary/            # Itinerary view and edit pages
│   ├── login/                # Login page
│   ├── privacy/              # Privacy policy page
│   ├── signup/               # Signup page
│   ├── terms/                # Terms of service page
│   ├── client-layout.tsx     # Client-side layout wrapper
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── animations/           # Animation components
│   ├── layout/               # Layout components
│   ├── onboarding/           # Onboarding components
│   ├── packing-list/         # Packing list components
│   ├── skeletons/            # Loading skeleton components
│   └── ui/                   # UI components (shadcn)
├── contexts/
│   └── auth-context.tsx      # Authentication context
├── hooks/
│   ├── use-mobile.tsx        # Mobile detection hook
│   ├── use-require-auth.ts   # Authentication requirement hook
│   └── use-toast.ts          # Toast notification hook
├── lib/
│   ├── database.types.ts     # Supabase database types
│   ├── gemini.ts             # Google Gemini AI integration
│   ├── image-service.ts      # Image service for destinations
│   ├── packing-list-generator.ts # Packing list generation
│   ├── storage-service.ts    # Supabase storage service
│   ├── supabase/             # Supabase client
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── .env.local                # Environment variables (not in repo)
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## Core Functionality

### Authentication Flow

The application uses Supabase Authentication for user management. The auth flow includes:

- Sign up with email/password
- Login with email/password
- Protected routes requiring authentication

### Trip Planning Process

1. **Trip Creation**: Users create a new trip with basic details (destination, dates, budget, interests)
2. **AI Recommendations**: The system generates personalized recommendations based on user preferences using Google Gemini AI
3. **Itinerary Building**: Users can add, edit, and organize activities for each day of their trip
4. **Collaboration**: Users can share trip plans with others via email
5. **Packing List**: AI-generated packing lists customized for the specific trip

### AI Integration

The application uses Google Gemini AI for:

- Generating personalized travel recommendations
- Suggesting activities based on user interests
- Creating customized packing lists
- Optimizing itineraries based on location and timing
- Providing estimated costs for budget planning

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy the application

### Environment Variables for Production

Ensure the following environment variables are set in your production environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`
- `UNSPLASH_ACCESS_KEY`
- `NEXT_PUBLIC_APP_URL`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Google for providing the Gemini AI capabilities
- Supabase for the backend infrastructure
- Vercel for hosting and deployment
- Unsplash for destination images
- All contributors who have helped build Sanchara

---

© 2025 Sanchara Travel Planner. All rights reserved.

```plaintext

This README provides comprehensive information about the Sanchara Travel Planner project, including setup instructions, database schema, project structure, and core functionality. Let me know if you'd like me to add or modify any sections!
```
