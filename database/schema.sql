-- =============================================
-- FORGEDVELOCI DATABASE SCHEMA
-- Azure SQL Database
-- =============================================

-- Products Table - Forged Wheels Catalog
CREATE TABLE Products (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(200) NOT NULL,
    model_code NVARCHAR(50) NOT NULL UNIQUE,
    description NVARCHAR(MAX),
    
    -- Wheel Specifications
    diameter INT NOT NULL,                              -- Size in inches (e.g., 19, 20, 21, 22)
    width DECIMAL(4,1) NOT NULL,                        -- Width in inches (e.g., 9.5, 10.0)
    offset_et INT,                                      -- Offset (ET value)
    pcd NVARCHAR(50),                                   -- Pitch Circle Diameter (e.g., "5x112")
    center_bore DECIMAL(5,2),                           -- Center bore in mm
    weight_kg DECIMAL(4,1),                             -- Weight per wheel in kg
    
    -- Finish & Style
    finish NVARCHAR(100),                               -- e.g., "Brushed Bronze", "Gloss Black"
    spoke_design NVARCHAR(100),                         -- e.g., "Multi-Spoke", "Y-Spoke"
    
    -- Pricing
    price_sek DECIMAL(10,2) NOT NULL,                   -- Price in SEK (per wheel)
    price_set_sek AS (price_sek * 4),                   -- Computed: Set of 4 price
    
    -- Media
    image_url NVARCHAR(500),                            -- Primary image (Azure Blob URL)
    gallery_urls NVARCHAR(MAX),                         -- JSON array of additional images
    
    -- Compatibility
    compatible_vehicles NVARCHAR(MAX),                  -- JSON array of compatible vehicle models
    
    -- Metadata
    is_featured BIT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETUTCDATE(),
    updated_at DATETIME2 DEFAULT GETUTCDATE()
);

-- Create index for faster vehicle compatibility searches
CREATE INDEX IX_Products_Active ON Products(is_active) INCLUDE (name, model_code, price_sek);

-- =============================================
-- Bespoke Requests Table - Custom Orders
-- =============================================

CREATE TABLE BespokeRequests (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    
    -- Customer Information
    customer_name NVARCHAR(200),
    customer_email NVARCHAR(200) NOT NULL,
    customer_phone NVARCHAR(50),
    
    -- Vehicle Details
    vehicle_make NVARCHAR(100) NOT NULL,                -- e.g., "BMW"
    vehicle_model NVARCHAR(100) NOT NULL,               -- e.g., "M4 Competition"
    vehicle_year INT,
    vehicle_color NVARCHAR(100),
    
    -- Wheel Requirements
    desired_diameter NVARCHAR(50),                      -- e.g., "20" or "21"
    desired_width_front NVARCHAR(50),                   -- Front wheel width
    desired_width_rear NVARCHAR(50),                    -- Rear wheel width
    desired_finish NVARCHAR(200),                       -- Finish preference
    additional_notes NVARCHAR(MAX),                     -- Custom requirements
    
    -- Reference/Inspiration
    reference_image_url NVARCHAR(500),                  -- Uploaded to Azure Blob
    inspiration_description NVARCHAR(MAX),
    
    -- Legal
    disclaimer_accepted BIT NOT NULL DEFAULT 0,         -- Must be true
    disclaimer_accepted_at DATETIME2,
    
    -- Workflow
    status NVARCHAR(50) DEFAULT 'pending',              -- pending, reviewing, quoted, accepted, in_production, completed, cancelled
    quoted_price_sek DECIMAL(10,2),
    quote_valid_until DATETIME2,
    assigned_engineer NVARCHAR(200),
    internal_notes NVARCHAR(MAX),
    
    -- Timestamps
    created_at DATETIME2 DEFAULT GETUTCDATE(),
    updated_at DATETIME2 DEFAULT GETUTCDATE()
);

-- Create index for status filtering
CREATE INDEX IX_BespokeRequests_Status ON BespokeRequests(status, created_at DESC);
CREATE INDEX IX_BespokeRequests_Email ON BespokeRequests(customer_email);

-- =============================================
-- Vehicle Lookups Table - For Reg Number API
-- =============================================

CREATE TABLE VehicleLookups (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    registration_number NVARCHAR(20) NOT NULL,
    
    -- Vehicle Data (from external API)
    make NVARCHAR(100),
    model NVARCHAR(100),
    year INT,
    color NVARCHAR(50),
    body_type NVARCHAR(50),
    
    -- Cached at
    looked_up_at DATETIME2 DEFAULT GETUTCDATE(),
    
    -- Analytics
    lookup_count INT DEFAULT 1
);

CREATE INDEX IX_VehicleLookups_RegNumber ON VehicleLookups(registration_number);

-- =============================================
-- Sample Data - Featured Products
-- =============================================

INSERT INTO Products (name, model_code, description, diameter, width, offset_et, pcd, finish, spoke_design, price_sek, is_featured, compatible_vehicles)
VALUES 
    ('Veloce GT', 'VEL-GT-001', 'Aggressive multi-spoke design with deep concave profile. Forged from 6061-T6 aluminum.', 
     20, 10.0, 35, '5x112', 'Brushed Bronze', 'Multi-Spoke', 18500, 1, 
     '["BMW M3", "BMW M4", "Audi RS4", "Audi RS5", "Mercedes-AMG C63"]'),
    
    ('Apex Carbon', 'APX-CB-001', 'Lightweight carbon-weave design. Ultimate performance wheel for track enthusiasts.',
     21, 11.0, 30, '5x120', 'Satin Black', 'Y-Spoke', 24900, 1,
     '["BMW M5", "BMW M8", "Porsche Panamera", "Tesla Model S"]'),
    
    ('Stealth Mono', 'STL-MN-001', 'Monoblock construction with stealth matte finish. Minimal weight, maximum impact.',
     19, 9.5, 40, '5x114.3', 'Matte Black', 'Split-5', 15900, 1,
     '["Nissan GT-R", "Honda NSX", "Toyota Supra", "Lexus LC500"]'),
    
    ('Regale', 'REG-001', 'Luxurious classic design with polished lip. Perfect for grand tourers.',
     20, 9.0, 38, '5x112', 'Polished Bronze Lip', 'Classic 10-Spoke', 21500, 0,
     '["Mercedes S-Class", "BMW 7-Series", "Audi A8", "Bentley Continental GT"]');
